import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/moviesService";
import type { Movie } from "../types/movie";

import AsyncState from "../components/ui/AsyncState";
import MyListButton from "../components/MyListButton";

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
      } catch {
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
      skeleton={<div className="p-6 max-w-5xl mx-auto" />}
    >
      {movie && (
        <div className="p-6 max-w-5xl mx-auto">

          <div className="flex flex-col md:flex-row-reverse gap-8">

            {/* POSTER */}
            <div className="relative w-full max-w-sm">

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="w-full rounded-xl shadow-2xl"
              />

              {/* MY LIST BUTTON */}
              <div className="absolute top-3 right-3 z-30">
                <MyListButton movieId={movie.id} />
              </div>

            </div>

            {/* DETAILS */}
            <div className="flex flex-col gap-4 text-right">

              <h1 className="text-3xl font-bold">
                {movie.title}
              </h1>

              {/* ⭐ ORIGINAL RATING (חזר!) */}
              <p className="text-yellow-400 font-semibold">
                ⭐ {movie.vote_average?.toFixed(1)} / 10
              </p>

              <p className="text-gray-400">
                📅 {movie.release_date}
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