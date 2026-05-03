import type { Genre, Movie } from "../types/movie";

export function mapGenresToMovies(
  movies: Movie[],
  genres: Genre[],
) {
  const map = new Map(genres.map((g) => [g.id, g.name]));

  return movies.map((movie) => ({
    ...movie,
    genres: (movie.genre_ids || [])
      .map((id) => ({
        id,
        name: map.get(id) || "Unknown",
      }))
      .filter(Boolean),
  }));
}