import { useEffect, useRef, useState } from "react";
import type { Movie } from "../types/movie";
import { getMovies } from "../services/moviesService";

export function useMovies(endpoint: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const initializedRef = useRef(false);

  async function fetchPage(pageNumber: number, replace = false) {
    try {
      setError(null);

      const data = await getMovies(endpoint, pageNumber);

      setMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));

        const filtered = data.results.filter(
          (m) => !existingIds.has(m.id)
        );

        return replace ? filtered : [...prev, ...filtered];
      });

      setPage(pageNumber);
      setHasMore(pageNumber < data.total_pages);
    } catch {
      setError("Failed to load movies");
    }
  }

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    (async () => {
      setLoading(true);
      await fetchPage(1, true);
      setLoading(false);
    })();
  }, [endpoint]);

  async function loadMore() {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    await fetchPage(page + 1);
    setLoadingMore(false);
  }

  return {
    movies,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
}