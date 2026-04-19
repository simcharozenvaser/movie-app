import { apiClient } from "./apiClient";
import type { MoviesResponse } from "../types/movie";

export async function getPopularMovies(): Promise<MoviesResponse> {
  try {
    const response = await apiClient.get<MoviesResponse>(
      "/movie/popular"
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}