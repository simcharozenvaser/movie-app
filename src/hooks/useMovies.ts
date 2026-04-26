import { useEffect, useState } from "react";
import type { Movie, MoviesResponse } from "../types/movie";

type FetchMoviesFunction = () => Promise<MoviesResponse>;

export function useMovies(fetchFunction: FetchMoviesFunction) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchFunction();

        setMovies(data.results);
      } catch (error) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [fetchFunction]);

  return {
    movies,
    loading,
    error,
  };
}
