import { useEffect, useState } from "react";
import { getGenres } from "../services/genresService";
import type { Genre } from "../types/movie";

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      const data = await getGenres();
      if (alive) {
        setGenres(data);
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, []);

  return { genres, loading };
}