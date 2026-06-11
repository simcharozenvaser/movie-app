type Props = {
  value?: string;
  onChange: (rating?: string) => void;
};

const MAX_STARS = 10;

export default function RatingFilter({ value, onChange }: Props) {
  const active = value ? Number(value) : null;

  function handleClick(star: number) {
    onChange(active === star ? undefined : String(star));
  }

  return (
    <div className="space-y-2">
      {/* Stars row */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: MAX_STARS }, (_, i) => {
          const star = i + 1;
          const filled = active !== null && star <= active;
          const isEdge = star === active;

          return (
            <button
              key={star}
              onClick={() => handleClick(star)}
              aria-label={`Minimum rating ${star}`}
              className="focus:outline-none transition-transform duration-100 hover:scale-110"
              style={{
                fontSize: "1.2rem",
                lineHeight: 1,
                color: filled ? "#e2b04a" : "rgba(255,255,255,0.15)",
                transform: isEdge ? "scale(1.15)" : undefined,
              }}
            >
              ★
            </button>
          );
        })}
      </div>

      {/* Label */}
      <p className="text-[11px] h-4" style={{ color: "rgba(255,255,255,0.3)" }}>
        {active !== null ? `${active} / 10 or higher` : "Any rating"}
      </p>
    </div>
  );
}