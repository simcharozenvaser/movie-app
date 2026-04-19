import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/moviesService";
import type { Movie } from "../types/movie";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);

        const data = await getPopularMovies();
        setMovies(data.results);

      } catch (err) {
        setError("Failed to load movies");
        console.error(err);

      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return {
    movies,
    loading,
    error,
  };
}