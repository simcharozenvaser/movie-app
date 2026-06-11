import { authFetch } from "./authFetch";

const API = "http://localhost:3001";

async function handle(res: Response) {
  const data = await res.json();
  return data;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  return handle(res);
}

export async function register(
  username: string,
  email: string,
  password: string
) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, email, password }),
  });

  return handle(res);
}

export async function getMe() {
  const res = await authFetch("/auth/me");

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}

export async function logout() {
  const res = await fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return handle(res);
}