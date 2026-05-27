const API = "http://localhost:3001";

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

function resolveQueue(token: string | null) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

async function refreshToken() {
  const res = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Refresh failed");

  const data = await res.json();

  if (!data?.accessToken) {
    throw new Error("Invalid refresh response");
  }

  return data.accessToken;
}

export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let token = localStorage.getItem("token");

  const request = (t: string | null) =>
    fetch(`${API}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        ...(options.headers || {}),
        Authorization: t ? `Bearer ${t}` : "",
        "Content-Type": "application/json",
      },
    });

  let res = await request(token);

  if (res.status !== 401) {
    return res;
  }

  if (isRefreshing) {
    return new Promise((resolve) => {
      queue.push(async (newToken) => {
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
  } catch (err) {
    isRefreshing = false;
    resolveQueue(null);

    localStorage.removeItem("token");

    throw err;
  }
}