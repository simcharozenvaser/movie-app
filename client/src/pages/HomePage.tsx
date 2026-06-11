import MovieList from "../components/MovieList";
import { useMovies } from "../hooks/useMovies";

export default function HomePage() {
  const popular = useMovies("/movie/popular");
  const trending = useMovies("/trending/movie/week");
  const topRated = useMovies("/movie/top_rated");
  const upcoming = useMovies("/movie/upcoming");

  return (
    <div>
      <MovieList title="Popular" {...popular} />
      <MovieList title="Trending" {...trending} />
      <MovieList title="Top Rated" {...topRated} />
      <MovieList title="Upcoming" {...upcoming} />
    </div>
  );
}
