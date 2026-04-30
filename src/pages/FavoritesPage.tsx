import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { useFavorites } from "../hooks/useFavorites";
import { getMoviesByIds } from "../services/moviesService";
import type { Movie } from "../types/movie";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const [movies, setMovies] =
    useState<Movie[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        if (favorites.length === 0) {
          setMovies([]);
          return;
        }

        const data =
          await getMoviesByIds(
            favorites
          );

        setMovies(data);

      } catch {
        setError(
          "Failed to load favorites"
        );
      } finally {
        setLoading(false);
      }
    }

    load();

  }, [favorites]);

  return (
    <div>

      <h1 className="
        text-2xl
        font-bold
        mb-4
      ">
        ⭐ Favorites
      </h1>

      <MovieList
        movies={movies}
        loading={loading}
        error={error}
      />

    </div>
  );
}