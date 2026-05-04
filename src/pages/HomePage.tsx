import { Link } from "react-router-dom";
import MovieList from "../components/MovieList";
import { useMovies } from "../hooks/useMovies";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const popular = useMovies("/movie/popular");
  const trending = useMovies("/trending/movie/week");
  const topRated = useMovies("/movie/top_rated");
  const upcoming = useMovies("/movie/upcoming");

  return (
    <div>
      {/* 🎭 GO TO GENRES */}
      <div className="flex justify-end mb-4">
        <Link
          to="/genres"
          className="px-4 py-2 bg-blue-600 rounded text-sm hover:bg-blue-500 transition"
        >
          🎭 {t("genres.browse")}
        </Link>
      </div>

      <MovieList title={t("movie.popular")} {...popular} />
      <MovieList title={t("movie.trending")} {...trending} />
      <MovieList title={t("movie.top_rated")} {...topRated} />
      <MovieList title={t("movie.upcoming")} {...upcoming} />
    </div>
  );
}
