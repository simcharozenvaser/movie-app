import { useEffect } from "react";
import { useGenres } from "../hooks/useGenres";

type Props = {
  selected: number[];
  onChange: (ids: number[]) => void;
  onGenreNamesResolved?: (map: Record<number, string>) => void;
};

export default function GenreFilter({
  selected,
  onChange,
  onGenreNamesResolved,
}: Props) {
  const { genres, loading } = useGenres();

  // Bubble name map up so parent can build filter pills
  useEffect(() => {
    if (!onGenreNamesResolved || genres.length === 0) return;
    const map: Record<number, string> = {};
    genres.forEach((g) => (map[g.id] = g.name));
    onGenreNamesResolved(map);
  }, [genres, onGenreNamesResolved]);

  function toggle(id: number) {
    if (selected.includes(id)) {
      onChange(selected.filter((x) => x !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  if (loading) {
    return (
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-7 rounded-full animate-pulse"
            style={{
              width: `${52 + (i % 3) * 16}px`,
              background: "rgba(255,255,255,0.05)",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) => {
        const active = selected.includes(g.id);
        return (
          <button
            key={g.id}
            onClick={() => toggle(g.id)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all"
            style={
              active
                ? {
                    background: "rgba(226,176,74,0.15)",
                    border: "1px solid rgba(226,176,74,0.5)",
                    color: "#e2b04a",
                  }
                : {
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.45)",
                  }
            }
          >
            {g.name}
          </button>
        );
      })}
    </div>
  );
}