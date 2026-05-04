import { useEffect, useMemo, useState } from "react";
import { useMyList } from "../hooks/useMyList";
import { getMoviesByIds } from "../services/moviesService";
import type { Movie } from "../types/movie";
import MyListMovieCard from "../components/MyListMovieCard";

type Filter = "all" | "watched" | "want_to_watch";

export default function MyListPage() {
  const { list } = useMyList();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  const idsKey = useMemo(
    () => list.map((i) => i.movieId).sort().join(","),
    [list]
  );

  useEffect(() => {
    async function load() {
      setLoading(true);

      const ids = list.map((i) => i.movieId);

      if (!ids.length) {
        setMovies([]);
        setLoading(false);
        return;
      }

      const data = await getMoviesByIds(ids);
      setMovies(data);

      setLoading(false);
    }

    load();
  }, [idsKey]);

  const itemMap = useMemo(() => {
    return new Map(list.map((i) => [i.movieId, i]));
  }, [list]);

  const filteredMovies = useMemo(() => {
    if (filter === "all") return movies;

    return movies.filter((m) => {
      const item = itemMap.get(m.id);
      return item?.status === filter;
    });
  }, [movies, filter, itemMap]);

  if (!loading && movies.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-20 text-lg">
        🎬 Your list is empty
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">
        🎬 My List ({movies.length})
      </h1>

      {/* 🔥 CLEAN TABS UI */}
      <div className="flex gap-2">
        {(["all", "watched", "want_to_watch"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              filter === f
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {f === "all"
              ? "All"
              : f === "watched"
              ? "Watched"
              : "Want to Watch"}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {filteredMovies.map((movie) => (
          <MyListMovieCard
            key={movie.id}
            movie={movie}
            item={itemMap.get(movie.id)}
          />
        ))}
      </div>

    </div>
  );
}