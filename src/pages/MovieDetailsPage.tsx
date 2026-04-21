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

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">
        {movie.title}
      </h1>

      <img
        className="w-full rounded mb-4"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      />

      <p className="mb-4">{movie.overview}</p>

      <p>
        ⭐ Rating: {movie.vote_average}
      </p>

      <p>
        📅 Release: {movie.release_date}
      </p>

    </div>
  );
}