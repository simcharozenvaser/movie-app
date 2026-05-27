import { apiClient } from "./apiClient";
import type { Genre } from "../types/movie";

export async function getGenres(): Promise<Genre[]> {
  const res = await apiClient.get("/genre/movie/list");
  return res.data.genres;
}