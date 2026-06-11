import { authFetch } from "../auth/authFetch";
import type { MyListItem } from "../types/movie";

export async function fetchMyList(): Promise<MyListItem[]> {
  const res = await authFetch("/my-list");

  if (!res.ok) return [];

  const data = await res.json();

  return Array.isArray(data) ? data : [];
}

export async function addToMyList(movieId: number) {
  const res = await authFetch("/my-list", {
    method: "POST",
    body: JSON.stringify({ movieId }),
  });

  return res.ok ? res.json() : null;
}

export async function updateMyList(movieId: number, updates: Partial<MyListItem>) {
  const res = await authFetch(`/my-list/${movieId}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });

  return res.ok ? res.json() : null;
}

export async function removeFromMyList(movieId: number) {
  const res = await authFetch(`/my-list/${movieId}`, {
    method: "DELETE",
  });

  return res.ok;
}