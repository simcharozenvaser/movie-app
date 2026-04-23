import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="
      w-[220px]
      h-[360px]
      flex-shrink-0
      bg-gray-900 text-white
      rounded-xl overflow-hidden
      cursor-pointer
      transform transition duration-300
      hover:scale-105 hover:shadow-2xl hover:-translate-y-1
      flex flex-col
    "
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-[260px] object-cover"
      />

      <div className="p-3 flex flex-col justify-between flex-1">
        <h3 className="font-semibold text-sm line-clamp-2">{movie.title}</h3>
        <p className="text-sm text-gray-600">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
        <p className="text-sm text-gray-500">
          {movie.release_date?.slice(0, 4)}
        </p>
      </div>
    </div>
  );
}
