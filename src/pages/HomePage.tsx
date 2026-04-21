import MovieList from "../components/MovieList";

import {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/moviesService";

import { useMovies } from "../hooks/useMovies";

export default function HomePage() {
  const popular = useMovies(getPopularMovies);
  const trending = useMovies(getTrendingMovies);
  const topRated = useMovies(getTopRatedMovies);
  const upcoming = useMovies(getUpcomingMovies);

  return (
    <div>

      <MovieList
        title="Trending Movies"
        movies={trending.movies}
        loading={trending.loading}
      />

      <MovieList
        title="Popular Movies"
        movies={popular.movies}
        loading={popular.loading}
      />

      <MovieList
        title="Top Rated Movies"
        movies={topRated.movies}
        loading={topRated.loading}
      />

      <MovieList
        title="Upcoming Movies"
        movies={upcoming.movies}
        loading={upcoming.loading}
      />

    </div>
  );
}