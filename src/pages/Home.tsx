import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/moviesService";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getPopularMovies().then((data) => {
      setMovies(data.results);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
}