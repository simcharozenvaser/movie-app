import { memo, useEffect, useState } from "react";
import type { Movie, MyListItem } from "../types/movie";
import { useMyList } from "../hooks/useMyList";
import MovieCard from "./MovieCard";

type Props = {
  movie: Movie;
  item?: MyListItem;
};

function MyListMovieCard({ movie, item }: Props) {
  const { updateMovie } = useMyList();

  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"watched" | "want_to_watch">("want_to_watch");

  useEffect(() => {
    if (!item) return;
    setNotes(item.myNotes || "");
    setStatus(item.status);
  }, [item?.movieId]);

  if (!item) return null;

  const toggleStatus = (newStatus: "watched" | "want_to_watch") => {
    setStatus(newStatus);
    updateMovie(movie.id, { status: newStatus });
  };

  const saveNotes = () => {
    updateMovie(movie.id, { myNotes: notes });
  };

  return (
    <div className="flex flex-col items-center">

      {/* 🎬 MOVIE CARD (unchanged) */}
      <MovieCard movie={movie} />

      {/* 🧱 FIXED HEIGHT PANEL */}
      <div className="w-[220px] mt-2 bg-gray-900 rounded-lg p-3 flex flex-col gap-2 h-[170px]">

        {/* STATUS */}
        <div className="flex justify-between text-xs text-gray-300">
          <span>Status:</span>
          <span className={status === "watched" ? "text-green-400" : "text-blue-400"}>
            {status === "watched" ? "Watched" : "Want"}
          </span>
        </div>

        {/* TOGGLE */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => toggleStatus("watched")}
            className={`flex-1 py-1 rounded ${
              status === "watched"
                ? "bg-green-500 text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            Watched
          </button>

          <button
            onClick={() => toggleStatus("want_to_watch")}
            className={`flex-1 py-1 rounded ${
              status === "want_to_watch"
                ? "bg-blue-500 text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            Want
          </button>
        </div>

        {/* NOTES (fixed space, no growth) */}
        {!isEditing ? (
          <div className="text-xs text-gray-300 h-[50px] overflow-hidden">
            {notes || "No notes"}
          </div>
        ) : (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={saveNotes}
            className="w-full h-[50px] resize-none bg-black text-white text-xs p-1 rounded"
          />
        )}

        {/* EDIT TOGGLE */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-400 text-xs text-left"
        >
          {isEditing ? "Done" : "Edit"}
        </button>

      </div>
    </div>
  );
}

export default memo(MyListMovieCard);