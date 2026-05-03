import { Link } from "react-router-dom";
import MovieList from "../components/MovieList";
import { useMovies } from "../hooks/useMovies";

export default function HomePage() {
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
          🎭 Browse by Genres
        </Link>
      </div>

      <MovieList title="Popular Movies" {...popular} />
      <MovieList title="Trending Movies" {...trending} />
      <MovieList title="Top Rated Movies" {...topRated} />
      <MovieList title="Upcoming Movies" {...upcoming} />

    </div>
  );
}