import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GenreFilter from "../components/GenreFilter";
import MovieCard from "../components/MovieCard";
import { discoverMovies } from "../services/moviesService";
import type { Movie } from "../types/movie";
import type { DiscoverFilters } from "../types/discover";
import YearRangeFilter from "../components/YearFilter";
import RatingFilter from "../components/RatingFilter";

export default function DiscoverPage() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<DiscoverFilters>({
    genres: [],
    minYear: "",
    maxYear: "",
    minRating: "",
    page: 1,
  });

  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [genreNames, setGenreNames] = useState<Record<number, string>>({});

  const updateFilters = useCallback((patch: Partial<DiscoverFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch, page: patch.page ?? 1 }));
  }, []);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.genres, filters.minYear, filters.maxYear, filters.minRating]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await discoverMovies(filters);
      setMovies((prev) =>
        filters.page === 1 ? data.results : [...prev, ...data.results],
      );
      setHasMore(filters.page < data.total_pages);
      setLoading(false);
    }
    load();
  }, [filters]);

  const clearAll = () => {
    setFilters({ genres: [], minYear: "", maxYear: "", minRating: "", page: 1 });
  };

  const hasActiveFilters =
    filters.genres.length > 0 || filters.minYear || filters.maxYear || filters.minRating;

  const activePills: { label: string; onRemove: () => void }[] = [];

  filters.genres.forEach((id) => {
    const name = genreNames[id];
    if (name) {
      activePills.push({
        label: name,
        onRemove: () =>
          updateFilters({ genres: filters.genres.filter((g) => g !== id) }),
      });
    }
  });

  if (filters.minYear || filters.maxYear) {
    const from = filters.minYear || "1873";
    const to = filters.maxYear || String(new Date().getFullYear());
    activePills.push({
      label: `${from} – ${to}`,
      onRemove: () => updateFilters({ minYear: "", maxYear: "" }),
    });
  }

  if (filters.minRating) {
    activePills.push({
      label: `★ ${filters.minRating}+`,
      onRemove: () => updateFilters({ minRating: "" }),
    });
  }

  return (
    <div
      className="min-h-screen text-white px-4 md:px-8 py-6"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors text-sm"
        >
          <span className="text-base leading-none">←</span>
          <span>Home</span>
        </button>

        <h1 className="text-sm font-medium tracking-[0.2em] uppercase text-white/60">
          Discover
        </h1>

        <button
          onClick={clearAll}
          className={`text-xs tracking-wide transition-colors ${
            hasActiveFilters
              ? "text-amber-400/80 hover:text-amber-300"
              : "text-white/20 pointer-events-none"
          }`}
        >
          Reset all
        </button>
      </div>

      {/* ── FILTER PANEL ── */}
      <div
        className="rounded-2xl border mb-3"
        style={{ background: "#111111", borderColor: "#1f1f1f" }}
      >
        {/* Genres row */}
        <div className="px-4 md:px-5 pt-4 md:pt-5 pb-4 border-b" style={{ borderColor: "#1f1f1f" }}>
          <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-3">
            Genre
          </p>
          <GenreFilter
            selected={filters.genres}
            onChange={(genres) => updateFilters({ genres })}
            onGenreNamesResolved={setGenreNames}
          />
        </div>

        {/* Year + Rating row */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x"
          style={{ borderColor: "#1f1f1f" }}
        >
          <div className="px-4 md:px-5 py-4">
            <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-3">
              Release Year
            </p>
            <YearRangeFilter
              minYear={filters.minYear}
              maxYear={filters.maxYear}
              onChange={(patch) =>
                setFilters((prev) => ({ ...prev, ...patch, page: 1 }))
              }
            />
          </div>

          <div className="px-4 md:px-5 py-4">
            <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 mb-3">
              Minimum Rating
            </p>
            <RatingFilter
              value={filters.minRating}
              onChange={(rating) => updateFilters({ minRating: rating })}
            />
          </div>
        </div>
      </div>

      {/* ── ACTIVE FILTER PILLS ── */}
      <div className="min-h-[32px] mb-6 flex items-center gap-2 flex-wrap">
        {activePills.length === 0 ? (
          <span className="text-xs text-white/20">No filters applied</span>
        ) : (
          activePills.map((pill) => (
            <button
              key={pill.label}
              onClick={pill.onRemove}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all"
              style={{
                background: "rgba(226,176,74,0.12)",
                border: "1px solid rgba(226,176,74,0.3)",
                color: "#e2b04a",
              }}
            >
              {pill.label}
              <span className="text-[10px] opacity-60">✕</span>
            </button>
          ))
        )}
      </div>

      {/* ── RESULTS HEADER ── */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs text-white/30 tracking-wide">
          {movies.length > 0 ? `${movies.length} films` : ""}
        </span>
        {loading && movies.length === 0 && (
          <span className="text-xs text-white/20 animate-pulse">Loading…</span>
        )}
      </div>

      {/* ── MOVIE GRID ── */}
      {movies.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-white/20 text-sm">No films match these filters.</p>
          <button
            onClick={clearAll}
            className="mt-4 text-xs text-amber-400/60 hover:text-amber-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mt-4 [&>*]:w-full [&>*]:h-auto [&>*]:aspect-[2/3]">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* ── LOAD MORE ── */}
      {hasMore && movies.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }))
            }
            disabled={loading}
            className="px-6 py-2.5 rounded-full text-sm transition-all disabled:opacity-40"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {loading ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}