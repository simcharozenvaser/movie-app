const API = "http://localhost:3001";

let isRefreshing = false;
let queue: ((token: string | null) => void)[] = [];

function resolveQueue(token: string | null) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

async function refreshToken(): Promise<string> {
  const res = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Refresh failed");

  const data = await res.json();
  return data.accessToken;
}

export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem("token");

  if (!token) {
    return new Response(JSON.stringify({ error: "NO_TOKEN" }), {
      status: 401,
    });
  }

  const request = (t: string) =>
    fetch(`${API}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
    });

  let res = await request(token);

  if (res.status !== 401) return res;

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      queue.push(async (newToken) => {
        if (!newToken) return reject(new Error("NO_REFRESH"));
        resolve(await request(newToken));
      });
    });
  }

  isRefreshing = true;

  try {
    const newToken = await refreshToken();
    localStorage.setItem("token", newToken);

    isRefreshing = false;
    resolveQueue(newToken);

    return await request(newToken);
  } catch {
    isRefreshing = false;
    resolveQueue(null);

    localStorage.removeItem("token");
    window.location.href = "/auth";

    return new Response(null, { status: 401 });
  }
}