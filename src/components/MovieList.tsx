import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  title?: string;
  loading?: boolean;
};

export default function MovieList({
  movies,
  title,
  loading,
}: MovieListProps) {
  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-xl font-bold mb-4">{title}</h2>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}