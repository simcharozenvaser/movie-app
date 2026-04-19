import { apiClient } from "./apiClient";

export async function getPopularMovies() {
  try {
    const response = await apiClient.get("/movie/popular");

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}