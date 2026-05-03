import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import MyListButton from "./MyListButton";

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750";

  const rating =
    movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : null;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="
        relative
        w-[220px]
        h-[360px]
        rounded-xl
        overflow-hidden
        flex-shrink-0
        group
      "
    >
      {/* IMAGE */}
      <img
        src={poster}
        className="w-full h-full object-cover group-hover:scale-105 transition"
      />

      {/* DARK OVERLAY */}
      <div className="
        absolute inset-0
        bg-black/0
        group-hover:bg-black/40
        transition
        z-10
      " />

      {/* ⭐ RATING */}
      {rating && (
        <div className="
          absolute top-2 left-2
          bg-black/70
          text-yellow-400
          text-sm px-2 py-1
          rounded-lg
          z-20
        ">
          ⭐ {rating}
        </div>
      )}

      {/* ➕ MY LIST BUTTON (החלק החשוב) */}
      <div className="
        absolute top-2 right-2
        z-30
      ">
        <MyListButton movieId={movie.id} />
      </div>

      {/* TITLE */}
      <div className="
        absolute bottom-0 p-3 w-full
        z-20
      ">
        <p className="text-sm font-semibold line-clamp-2">
          {movie.title}
        </p>
      </div>
    </Link>
  );
}