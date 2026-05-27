import { useState } from "react";
import { useGenres } from "../hooks/useGenres";
import { useTranslation } from "react-i18next";

type Props = {
  selected: number[];
  onChange: (ids: number[]) => void;
};

export default function GenreFilter({ selected, onChange }: Props) {
  const { genres, loading } = useGenres();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  function toggle(id: number) {
    if (selected.includes(id)) {
      onChange(selected.filter((x: number) => x !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  if (loading) return null;

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 bg-gray-800 rounded text-sm"
      >
        🎭 {t("genres.title")} ({selected.length})
      </button>

      {open && (
        <div className="flex flex-wrap gap-2 mt-3">
          {genres.map((g) => (
            <button
              key={g.id}
              onClick={() => toggle(g.id)}
              className={`
                px-3 py-1 rounded-full text-xs
                ${
                  selected.includes(g.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300"
                }
              `}
            >
              {g.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
