import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/moviesService";
import type { Movie } from "../types/movie";
import MovieList from "../components/MovieList";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading movies...
      </p>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Popular Movies
      </h1>

      <MovieList movies={movies} />
    </div>
  );
}