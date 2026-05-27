import { getGenres } from "./genresService";

let cache: Record<number, string> | null = null;

export async function getGenreMap() {
  if (cache) return cache;

  const genres = await getGenres();

  cache = Object.fromEntries(
    genres.map((g) => [g.id, g.name])
  );

  return cache;
}