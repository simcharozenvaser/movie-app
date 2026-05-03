import { memo, useEffect, useState } from "react";
import { useMyList } from "../hooks/useMyList";
import type { Movie, MyListItem } from "../types/movie";

type Props = {
  movie: Movie;
  item?: MyListItem;
};

function MyListMovieCard({ movie, item }: Props) {
  const { updateMovie, removeMovie } = useMyList();

  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (!item) return;
    setNotes(item.myNotes || "");
    setRating(item.myRating || 0);
  }, [item?.movieId]);

  if (!item) return null;

  const saveNotes = () => {
    updateMovie(movie.id, { myNotes: notes });
  };

  const saveRating = (val: number) => {
    const final = val === rating ? 0 : val;
    setRating(final);
    updateMovie(movie.id, { myRating: final || null });
  };

  // ✅ חשוב: לא שוברים event bubbling
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeMovie(movie.id);
  };

  const setStatus = (status: MyListItem["status"]) => {
    updateMovie(movie.id, { status });
  };

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">

      {/* poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="h-[260px] w-full object-cover"
      />

      <div className="p-3 flex flex-col gap-3">

        <p className="font-semibold text-sm">{movie.title}</p>

        {/* TMDB + user rating */}
        <div className="flex justify-between text-xs text-gray-400">
          <span>TMDB ⭐ {movie.vote_average?.toFixed(1)}</span>
          <span>Your ⭐ {rating || "-"}</span>
        </div>

        {/* ⭐ stars */}
        <div className="flex gap-1 text-xl">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              onClick={() => saveRating(s)}
              className={`cursor-pointer transition ${
                (hover || rating) >= s
                  ? "text-yellow-400"
                  : "text-gray-600"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* 🎯 STATUS (חדש - בלי לשבור כלום) */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setStatus("want_to_watch")}
            className={`px-2 py-1 rounded transition ${
              item.status === "want_to_watch"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            רוצה לצפות
          </button>

          <button
            onClick={() => setStatus("watched")}
            className={`px-2 py-1 rounded transition ${
              item.status === "watched"
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            צפיתי
          </button>
        </div>

        {/* notes */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={saveNotes}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              saveNotes();
              e.currentTarget.blur();
            }
          }}
          className="bg-black text-white text-xs p-2 rounded border border-gray-700"
          placeholder="Notes..."
        />

        {/* remove — FIXED */}
        <button
          onClick={handleRemove}
          className="text-red-400 text-xs hover:text-red-300 transition"
        >
          Remove
        </button>

      </div>
    </div>
  );
}

export default memo(MyListMovieCard);