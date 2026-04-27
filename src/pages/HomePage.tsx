import MovieList from "../components/MovieList";
import { getMovies } from "../services/moviesService";
import { useMovies } from "../hooks/useMovies";

export const moviesEndpoints = {
  popular: "/movie/popular",
  trending: "/trending/movie/week",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};

export default function HomePage() {
  const popular = useMovies(moviesEndpoints.popular);
  const trending = useMovies(moviesEndpoints.trending);
  const topRated = useMovies(moviesEndpoints.topRated);
  const upcoming = useMovies(moviesEndpoints.upcoming);

  return (
    <div>
      <MovieList
        title="Popular Movies"
        movies={popular.movies}
        loading={popular.loading}
        error={popular.error}
        loadMore={popular.loadMore}
        loadingMore={popular.loadingMore}
        hasMore={popular.hasMore}
      />

      <MovieList
        title="Trending Movies"
        movies={trending.movies}
        loading={trending.loading}
        error={trending.error}
        loadMore={trending.loadMore}
        loadingMore={trending.loadingMore}
        hasMore={trending.hasMore}
      />

      <MovieList
        title="TopRated Movies"
        movies={topRated.movies}
        loading={topRated.loading}
        error={topRated.error}
        loadMore={topRated.loadMore}
        loadingMore={topRated.loadingMore}
        hasMore={topRated.hasMore}
      />

      <MovieList
        title="Upcoming Movies"
        movies={upcoming.movies}
        loading={upcoming.loading}
        error={upcoming.error}
        loadMore={upcoming.loadMore}
        loadingMore={upcoming.loadingMore}
        hasMore={upcoming.hasMore}
      />
    </div>
  );
}
