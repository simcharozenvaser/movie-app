import type { Movie } from "../types/movie";

export function getMovieGenreNames(
  movie: Movie,
  genreMap: Record<number, string>,
  fallbackGenres: { id: number; name: string }[] = []
): string[] {
  if (movie.genres?.length) {
    return movie.genres.map((g) => g.name);
  }

  if (movie.genre_ids?.length && Object.keys(genreMap).length) {
    return movie.genre_ids
      .map((id) => genreMap[id])
      .filter((name): name is string => Boolean(name));
  }

  if (movie.genre_ids?.length && fallbackGenres.length) {
    return movie.genre_ids
      .map((id) => fallbackGenres.find((g) => g.id === id)?.name)
      .filter((name): name is string => Boolean(name));
  }

  return [];
}