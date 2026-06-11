import { useEffect, useRef, useState } from "react";

type Props = {
  minYear?: string;
  maxYear?: string;
  onChange: (patch: { minYear?: string; maxYear?: string }) => void;
};

const MIN = 1873;
const MAX = new Date().getFullYear();

function clean(value: string) {
  return value.replace(/[^\d]/g, "").slice(0, 4);
}

function toNum(v: string): number | null {
  if (!v) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function validate(raw: string, otherRaw: string, field: "min" | "max"): string | null {
  if (!raw) return null;
  const n = toNum(raw);
  if (n === null) return "Not a number";
  if (n < MIN) return `Min ${MIN}`;
  if (n > MAX) return `Max ${MAX}`;
  const other = toNum(otherRaw);
  if (other !== null) {
    if (field === "min" && n > other) return `After "to" year`;
    if (field === "max" && n < other) return `Before "from" year`;
  }
  return null;
}

export default function YearRangeFilter({ minYear, maxYear, onChange }: Props) {
  const [minLocal, setMinLocal] = useState(minYear ?? "");
  const [maxLocal, setMaxLocal] = useState(maxYear ?? "");
  const [minError, setMinError] = useState<string | null>(null);
  const [maxError, setMaxError] = useState<string | null>(null);
  const committingRef = useRef(false);

  useEffect(() => {
    if (committingRef.current) { committingRef.current = false; return; }
    setMinLocal(minYear ?? "");
    setMaxLocal(maxYear ?? "");
    setMinError(null);
    setMaxError(null);
  }, [minYear, maxYear]);

  function tryCommit(nextMin: string, nextMax: string) {
    const errMin = validate(nextMin, nextMax, "min");
    const errMax = validate(nextMax, nextMin, "max");
    setMinError(errMin);
    setMaxError(errMax);
    if (errMin || errMax) return;
    committingRef.current = true;
    onChange({ minYear: nextMin || undefined, maxYear: nextMax || undefined });
  }

  const inputBase: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    color: "white",
    fontSize: "0.875rem",
    padding: "6px 10px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.15s",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <input
            value={minLocal}
            onChange={(e) => { setMinLocal(clean(e.target.value)); setMinError(null); }}
            onBlur={() => tryCommit(minLocal, maxLocal)}
            placeholder={String(MIN)}
            inputMode="numeric"
            aria-label="From year"
            style={{
              ...inputBase,
              borderColor: minError ? "rgba(248,113,113,0.6)" : "rgba(255,255,255,0.08)",
            }}
          />
          {minError && (
            <span className="text-[10px] px-1" style={{ color: "#f87171" }}>{minError}</span>
          )}
        </div>

        <span className="mt-1.5 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>—</span>

        <div className="flex-1 flex flex-col gap-1">
          <input
            value={maxLocal}
            onChange={(e) => { setMaxLocal(clean(e.target.value)); setMaxError(null); }}
            onBlur={() => tryCommit(minLocal, maxLocal)}
            placeholder={String(MAX)}
            inputMode="numeric"
            aria-label="To year"
            style={{
              ...inputBase,
              borderColor: maxError ? "rgba(248,113,113,0.6)" : "rgba(255,255,255,0.08)",
            }}
          />
          {maxError && (
            <span className="text-[10px] px-1" style={{ color: "#f87171" }}>{maxError}</span>
          )}
        </div>
      </div>

      {!minError && !maxError && (
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
          {MIN} – {MAX}
        </p>
      )}
    </div>
  );
}