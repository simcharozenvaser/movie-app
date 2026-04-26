import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import AsyncState from "./ui/AsyncState";
import type { Movie } from "../types/movie";

type Props = {
  movies: Movie[];
  title?: string;
  loading?: boolean;
  error?: string | null;
};

export default function MovieList({
  movies,
  title,
  loading,
  error,
}: Props) {
  return (
    <section className="mb-10 px-2">

      {title && (
        <h2 className="text-2xl font-bold mb-3">
          {title}
        </h2>
      )}

      <AsyncState
        loading={loading}
        error={error}
        isEmpty={!loading && movies.length === 0}
        skeleton={
          <div className="flex gap-4 overflow-x-auto pb-3">
            {Array.from({ length: 6 }).map(
              (_, i) => (
                <MovieCardSkeleton key={i} />
              )
            )}
          </div>
        }
      >
        <div className="flex gap-4 overflow-x-auto pb-3">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </AsyncState>

    </section>
  );
}