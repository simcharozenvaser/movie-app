import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/moviesService";
import type { Movie } from "../types/movie";

import AsyncState from "../components/ui/AsyncState";

export default function MovieDetailsPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        if (!id) return;

        setLoading(true);
        setError(null);

        const data = await getMovieById(id);

        setMovie(data);

      } catch (err) {
        console.error(err);
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  return (
    <AsyncState
      loading={loading}
      error={error}
      isEmpty={!movie}
      skeleton={
        <div className="p-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-8 animate-pulse">
            <div className="w-full max-w-sm h-[450px] bg-gray-700 rounded-xl" />

            <div className="flex flex-col gap-4 flex-1">
              <div className="h-8 bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-700 rounded w-1/3" />
              <div className="h-4 bg-gray-700 rounded w-1/3" />
              <div className="h-24 bg-gray-700 rounded w-full" />
            </div>
          </div>
        </div>
      }
    >
      {movie && (
        <div className="p-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-8">
            {/* Poster */}
            <img
              className="
                w-full
                max-w-sm
                rounded-xl
                shadow-2xl
              "
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            {/* Details */}
            <div className="flex flex-col gap-4 text-right">
              <h1 className="text-3xl font-bold">
                {movie.title}
              </h1>

              <p className="text-gray-300">
                ⭐ דירוג: {movie.vote_average?.toFixed(1)}
              </p>

              <p className="text-gray-400">
                📅 תאריך יציאה: {movie.release_date}
              </p>

              <p className="text-gray-300 leading-relaxed">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      )}
    </AsyncState>
  );
}