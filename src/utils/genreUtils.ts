import type { Movie } from "../types/movie";

export function getGenreIds(movie: Movie): number[] {
  return movie.genre_ids ?? [];
}