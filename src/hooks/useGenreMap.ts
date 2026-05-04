import { useEffect, useState } from "react";
import { getGenres } from "../services/genresService";
import type { Genre } from "../types/movie";

let cache: Record<number, string> | null = null;

export function useGenreMap() {
  const [genreMap, setGenreMap] = useState<Record<number, string>>({});

  useEffect(() => {
    async function load() {
      if (cache) {
        setGenreMap(cache);
        return;
      }

      const genres: Genre[] = await getGenres();

      cache = Object.fromEntries(
        genres.map((g) => [g.id, g.name])
      );

      setGenreMap(cache);
    }

    load();
  }, []);

  return genreMap;
}