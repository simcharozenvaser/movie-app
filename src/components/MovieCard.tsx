import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import FavoriteButton from "./FavoriteButton";

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750";

  const rating =
    movie.vote_average && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : null;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="
        relative
        w-[220px]
        h-[360px]
        cursor-pointer
        group
        overflow-hidden
        rounded-xl
        flex-shrink-0
      "
    >
      {/* POSTER */}
      <img
        src={poster}
        alt={movie.title}
        className="
          w-full
          h-full
          object-cover
          group-hover:scale-105
          transition
        "
      />

      {/* HOVER OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-black/0
          group-hover:bg-black/40
          transition
        "
      />

      {/* FAVORITE BUTTON */}
      <FavoriteButton
        movieId={movie.id}
        className="
          absolute
          top-2
          right-2
          text-2xl
          opacity-0
          group-hover:opacity-100
          transition
        "
      />

      {/* RATING BADGE */}
      {rating && (
        <div
          className="
            absolute
            top-2
            left-2
            bg-black/70
            text-yellow-400
            text-sm
            font-semibold
            px-2
            py-1
            rounded-lg
            backdrop-blur
          "
        >
          ⭐ {rating}
        </div>
      )}

      {/* TITLE */}
      <div className="absolute bottom-0 p-3 w-full">
        <p className="text-sm font-semibold line-clamp-2">
          {movie.title}
        </p>
      </div>
    </Link>
  );
}