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
        title="Popular Movies"
        movies={popular.movies}
        loading={popular.loading}
        error={popular.error}
      />

      <MovieList
        title="Trending Movies"
        movies={trending.movies}
        loading={trending.loading}
        error={trending.error}
      />

      <MovieList
        title="TopRated Movies"
        movies={topRated.movies}
        loading={topRated.loading}
        error={topRated.error}
      />

      <MovieList
        title="Upcoming Movies"
        movies={upcoming.movies}
        loading={upcoming.loading}
        error={upcoming.error}
      />
    </div>
  );
}
