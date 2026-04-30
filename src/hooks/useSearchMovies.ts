import { useState } from "react";
import type { Movie } from "../types/movie";
import { searchMovies } from "../services/moviesService";

export function useSearchMovies() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(query: string) {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const data = await searchMovies(query);

      setResults(data.results);
    } catch (error) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  }

  return {
    results,
    loading,
    error,
    search,
  };
}
