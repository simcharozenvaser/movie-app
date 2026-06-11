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
  const [status, setStatus] =
    useState<"watched" | "want_to_watch">("want_to_watch");
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    if (!item) return;

    setNotes(item.myNotes || "");
    setStatus(item.status);
    setRating(item.myRating ?? null);
  }, [item?.movieId]);

  if (!item) return null;

  // ✅ לוגיקה שלך נשארת כמו שהיא
  const toggleStatus = (newStatus: "watched" | "want_to_watch") => {
    setStatus(newStatus);
    updateMovie(movie.id, { status: newStatus });
  };

  const saveNotes = () => {
    updateMovie(movie.id, { myNotes: notes });
  };

  const saveRating = (value: number) => {
    setRating(value);
    updateMovie(movie.id, { myRating: value });
  };

  return (
    <div className="flex flex-col items-center w-[220px]">
      <MovieCard movie={movie} />

      {/* PANEL (NEW DESIGN) */}
      <div className="
        w-full mt-2
        bg-black/40 backdrop-blur-md
        border border-white/10
        rounded-xl
        p-3
        flex flex-col gap-3
        h-[220px]
        justify-between
      ">

        {/* STATUS */}
        <div className="flex justify-between text-[11px] text-white/60">
          <span>Status</span>

          <span
            className={
              status === "watched"
                ? "text-green-400"
                : "text-blue-400"
            }
          >
            {status === "watched" ? "Watched" : "Want to Watch"}
          </span>
        </div>

        {/* TOGGLE */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => toggleStatus("watched")}
            className={`
              flex-1 py-1.5 rounded-md transition border text-[11px]
              ${
                status === "watched"
                  ? "bg-green-500/25 border-green-400 text-green-200"
                  : "bg-black/20 border-white/10 text-white/50 hover:text-white/80"
              }
            `}
          >
            Watched
          </button>

          <button
            onClick={() => toggleStatus("want_to_watch")}
            className={`
              flex-1 py-1.5 rounded-md transition border text-[11px]
              ${
                status === "want_to_watch"
                  ? "bg-blue-500/25 border-blue-400 text-blue-200"
                  : "bg-black/20 border-white/10 text-white/50 hover:text-white/80"
              }
            `}
          >
            Want to Watch
          </button>
        </div>

        {/* RATING */}
        <div className="flex flex-col gap-1">
          <div className="text-[11px] text-white/60">
            My Rating:{" "}
            <span className="text-yellow-400">
              {rating ?? "—"}
            </span>
          </div>

          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => {
              const value = i + 1;

              return (
                <button
                  key={value}
                  onClick={() => saveRating(value)}
                  className="text-sm transition-transform hover:scale-110 active:scale-95"
                  style={{
                    color:
                      rating === value
                        ? "#fbbf24"
                        : "rgba(255,255,255,0.25)",
                  }}
                >
                  ★
                </button>
              );
            })}
          </div>
        </div>

        {/* NOTES */}
        {!isEditing ? (
          <div className="text-xs text-white/60 h-[40px] overflow-hidden">
            {notes || (
              <span className="text-white/25 italic">Add note</span>
            )}
          </div>
        ) : (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="
              w-full h-[40px]
              resize-none
              bg-black/30
              border border-white/10
              rounded-md
              text-white text-xs
              p-1
              outline-none
            "
          />
        )}

        {/* ACTIONS */}
        <div className="flex justify-between items-center">

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-[11px] text-white/50 hover:text-white/80"
          >
            {isEditing ? "Cancel" : "Edit Note"}
          </button>

          {isEditing && (
            <button
              onClick={() => {
                saveNotes();
                setIsEditing(false);
              }}
              className="text-[11px] text-green-400 hover:text-green-300"
            >
              Save
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default memo(MyListMovieCard);