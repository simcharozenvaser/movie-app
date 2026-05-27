import { memo, useEffect, useState } from "react";
import type { Movie, MyListItem } from "../types/movie";
import { useMyList } from "../hooks/useMyList";
import MovieCard from "./MovieCard";
import { useTranslation } from "react-i18next";

type Props = {
  movie: Movie;
  item?: MyListItem;
};

function MyListMovieCard({ movie, item }: Props) {
  const { updateMovie } = useMyList();

  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"watched" | "want_to_watch">(
    "want_to_watch",
  );
  const [rating, setRating] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!item) return;
    setNotes(item.myNotes || "");
    setStatus(item.status);
    setRating(item.myRating ?? null);
  }, [item?.movieId]);

  if (!item) return null;

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
    <div className="flex flex-col items-center">
      {/* 🎬 MOVIE CARD */}
      <MovieCard movie={movie} />

      {/* PANEL */}
      <div className="w-[220px] mt-2 bg-gray-900 rounded-lg p-3 flex flex-col gap-2 h-[210px] justify-between">
        {/* STATUS */}
        <div className="flex justify-between text-xs text-gray-300">
          <span>{t("myList.status")}</span>
          <span
            className={
              status === "watched" ? "text-green-400" : "text-blue-400"
            }
          >
            {status === "watched" ? t("myList.watched") : t("myList.want")}
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
            {t("myList.watched")}
          </button>

          <button
            onClick={() => toggleStatus("want_to_watch")}
            className={`flex-1 py-1 rounded ${
              status === "want_to_watch"
                ? "bg-blue-500 text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            {t("myList.want")}
          </button>
        </div>

        {/* ⭐ RATING */}
        <div className="flex flex-col gap-1">
          <div className="text-xs text-gray-300">
            {t("myList.MyRating")} {rating ?? "—"}
          </div>

          <div className="flex gap-1 flex-wrap">
            {Array.from({ length: 10 }).map((_, i) => {
              const value = i + 1;

              return (
                <button
                  key={value}
                  onClick={() => saveRating(value)}
                  className={`
                    w-5 h-5 text-[10px] rounded
                    transition
                    ${
                      rating === value
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        {/* NOTES */}
        {!isEditing ? (
          <div className="text-xs text-gray-300 h-[40px] overflow-hidden">
            {notes || t("myList.add_notes")}
          </div>
        ) : (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-[40px] resize-none bg-black text-white text-xs p-1 rounded"
          />
        )}

        {/* ACTIONS */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-400 text-xs"
          >
            {isEditing ? t("myList.cancel") : t("myList.edit_notes")}
          </button>

          {isEditing && (
            <button
              onClick={() => {
                saveNotes();
                setIsEditing(false);
              }}
              className="text-green-400 text-xs"
            >
              {t("myList.save")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(MyListMovieCard);
