import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/moviesService";
import type { Movie } from "../types/movie";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        if (!id) return;

        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
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
          <h1 className="text-3xl font-bold">{movie.title}</h1>

          <p className="text-gray-300">
            ⭐ דירוג: {movie.vote_average?.toFixed(1)}
          </p>

          <p className="text-gray-400">📅 תאריך יציאה: {movie.release_date}</p>

          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
