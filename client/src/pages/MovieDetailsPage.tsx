import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/moviesService";
import type { Movie } from "../types/movie";
import AsyncState from "../components/ui/AsyncState";
import MovieCard from "../components/MovieCard";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        if (!id) return;
        setLoading(true);
        setError(null);
        const data = await getMovieById(id);
        setMovie(data);
      } catch {
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return (
    <AsyncState loading={loading} error={error} isEmpty={!movie}>
      {movie && (
        <div className="px-4 py-6 max-w-5xl mx-auto">

          {/* reuse CARD */}
          <div className="flex justify-center mb-6">
            <MovieCard movie={movie} />
          </div>

          {/* description */}
          <p className="text-gray-300 leading-relaxed text-center text-sm md:text-base px-2 md:px-0">
            {movie.overview}
          </p>

        </div>
      )}
    </AsyncState>
  );
}