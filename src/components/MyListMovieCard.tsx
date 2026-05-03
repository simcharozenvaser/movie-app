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

  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!item) return;
    setNotes(item.myNotes || "");
    setRating(item.myRating || 0);
  }, [item?.movieId]);

  if (!item) return null;

  const save = () => {
    updateMovie(movie.id, {
      myNotes: notes,
      myRating: rating || null,
    });
    setEditing(false);
  };

  const cancel = () => {
    setNotes(item.myNotes || "");
    setEditing(false);
  };

  return (
    <div className="flex flex-col items-center">

      {/* 🎬 BASE CARD */}
      <MovieCard movie={movie} />

      {/* 🔽 PANEL */}
      <div className="w-[220px] mt-2 bg-gray-900 rounded-lg p-3 flex flex-col gap-3">

        {/* STATUS */}
        <select
          value={item.status}
          onChange={(e) =>
            updateMovie(movie.id, {
              status: e.target.value as MyListItem["status"],
            })
          }
          className="bg-black text-white text-xs p-1 rounded"
        >
          <option value="want_to_watch">Want to watch</option>
          <option value="watched">Watched</option>
        </select>

        {/* ⭐ RATING */}
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              onClick={() => {
                setRating(s);
                updateMovie(movie.id, { myRating: s });
              }}
              className={`cursor-pointer text-lg ${
                rating >= s ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* 📝 NOTES (FINAL UX) */}
        {!editing ? (
          <div className="flex flex-col gap-2">

            {/* TEXT */}
            <div className="text-xs text-gray-300 bg-black/60 p-2 rounded min-h-[40px]">
              {notes ? notes : <span className="text-gray-500">No notes yet</span>}
            </div>

            {/* ACTION */}
            <button
              onClick={() => setEditing(true)}
              className="text-blue-400 text-xs hover:text-blue-300 self-end"
            >
              {notes ? "Edit" : "+ Add note"}
            </button>

          </div>
        ) : (
          <div className="flex flex-col gap-2">

            <textarea
              autoFocus
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="
                bg-black text-white text-xs p-2 rounded
                border border-gray-700
                focus:border-blue-500
                outline-none resize-none
              "
              rows={3}
              placeholder="Write your note..."
            />

            <div className="flex justify-between">

              <button
                onClick={cancel}
                className="text-gray-400 text-xs hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={save}
                className="text-green-400 text-xs hover:text-green-300"
              >
                Save
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default memo(MyListMovieCard);