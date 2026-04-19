import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />

      <div className="p-3">
        <h3 className="font-semibold text-lg mb-1">
          {movie.title}
        </h3>

        <p className="text-sm text-gray-600">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>

        <p className="text-sm text-gray-500">
          {movie.release_date}
        </p>
      </div>
    </div>
  );
}