import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreFilter from "../components/GenreFilter";
import MovieCard from "../components/MovieCard";
import { discoverMovies } from "../services/moviesService";
import type { Movie } from "../types/movie";
import { useTranslation } from "react-i18next";

export default function GenresPage() {
  const navigate = useNavigate();

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  // 🔥 FETCH
  useEffect(() => {
    async function load() {
      setLoading(true);

      const data = await discoverMovies(selectedGenres, page);

      setMovies((prev) =>
        page === 1 ? data.results : [...prev, ...data.results],
      );

      setHasMore(page < data.total_pages);

      setLoading(false);
    }

    load();
  }, [selectedGenres, page]);

  // 🔥 RESET כשמשנים זאנר
  useEffect(() => {
    setPage(1);
  }, [selectedGenres]);

  const clearAll = () => {
    navigate("/");
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🎭 {t("genres.title")}</h1>

        <button
          onClick={clearAll}
          className="text-gray-400 text-sm hover:text-white"
        >
          {t("genres.back_home")}
        </button>
      </div>

      {/* FILTER */}
      <GenreFilter selected={selectedGenres} onChange={setSelectedGenres} />

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* LOAD MORE */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-800 rounded"
          >
            {loading ? t("state.loading") : t("actions.show_more")}
          </button>
        </div>
      )}
    </div>
  );
}
