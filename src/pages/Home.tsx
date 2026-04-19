import MovieList from "../components/MovieList";
import { useMovies } from "../hooks/useMovies";

export default function Home() {
  const { movies, loading, error } = useMovies();

  if (loading) {
    return <p className="text-center mt-10">Loading movies...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
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