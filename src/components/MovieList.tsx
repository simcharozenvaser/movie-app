import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  title?: string;
  loading?: boolean;
};

export default function MovieList({ movies, title, loading }: MovieListProps) {
  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <section className="mb-10 px-2">
      {title && <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>}
      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide items-stretch">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
