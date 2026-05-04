import { apiClient } from "./apiClient";
import type { MoviesResponse, Movie } from "../types/movie";

export async function getMovies(
  endpoint: string,
  page: number = 1
): Promise<MoviesResponse> {
  try {
    const response = await apiClient.get<MoviesResponse>(endpoint, {
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

export async function searchMovies(query: string): Promise<MoviesResponse> {
  try {
    const response = await apiClient.get<MoviesResponse>(
      "/search/movie",
      {
        params: { query },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
}

export async function getMovieById(id: string): Promise<Movie> {
  try {
    const response = await apiClient.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
}

export async function getMoviesByIds(ids: number[]): Promise<Movie[]> {
  try {
    const requests = ids.map((id) =>
      apiClient.get(`/movie/${id}`)
    );

    const responses = await Promise.all(requests);

    return responses.map((res) => res.data);

  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return [];
  }
}

export async function discoverMovies(
  genres: number[],
  page: number = 1
) {
  const params: Record<string, any> = {
    page,
  };

  if (genres.length) {
    params.with_genres = genres.join(",");
  }

  const res = await apiClient.get("/discover/movie", { params });

  return res.data;
}