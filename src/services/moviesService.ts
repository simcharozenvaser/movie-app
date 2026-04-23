import { apiClient } from "./apiClient";
import type { MoviesResponse, Movie } from "../types/movie";

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

export async function getTrendingMovies(): Promise<MoviesResponse> {
  try {
    const response = await apiClient.get<MoviesResponse>(
      "/trending/movie/week"
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
}

export async function getTopRatedMovies(): Promise<MoviesResponse> {
  try {
    const response = await apiClient.get<MoviesResponse>(
      "/movie/top_rated"
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
}

export async function getUpcomingMovies(): Promise<MoviesResponse> {
  try {
    const response = await apiClient.get<MoviesResponse>(
      "/movie/upcoming"
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
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