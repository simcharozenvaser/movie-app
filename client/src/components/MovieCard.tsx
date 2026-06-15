import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import MyListButton from "./MyListButton";
import { useGenreMap } from "../hooks/useGenreMap";
import { getMovieGenreNames } from "../utils/movieGenres";

export default function MovieCard({ movie }: { movie: Movie }) {
  const genreMap = useGenreMap();

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750";

  const rating = movie.vote_average > 0 ? movie.vote_average.toFixed(1) : null;

  const genreNames = getMovieGenreNames(movie, genreMap);
  const year = movie.release_date?.split("-")[0];

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative w-[220px] h-[360px] rounded-xl overflow-hidden flex-shrink-0 group"
    >
      <img
        src={poster}
        className="w-full h-full object-cover group-hover:scale-105 transition"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition z-10" />

      {rating && (
        <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-sm px-2 py-1 rounded-lg z-20">
          ⭐ {rating}
        </div>
      )}

      {genreNames.length > 0 && (
        <div className="absolute top-10 left-2 z-20 flex flex-wrap gap-1 max-w-[90%]">
          {genreNames.map((name) => (
            <span
              key={name}
              className="text-[10px] bg-black/70 text-white px-2 py-[2px] rounded-full"
            >
              {name}
            </span>
          ))}
        </div>
      )}

      <div className="absolute top-2 right-2 z-30">
        <MyListButton movieId={movie.id} />
      </div>

      <div className="absolute bottom-0 p-3 w-full z-20">
        <p className="text-sm font-semibold line-clamp-2">{movie.title}</p>
        {year && <p className="text-xs text-gray-300 mt-1">{year}</p>}
      </div>
    </Link>
  );
}