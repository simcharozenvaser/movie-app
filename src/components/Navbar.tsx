import { useState } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";
import MovieCard from "./MovieCard";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const { results, search } = useSearchMovies();

  function handleChange(value: string) {
    setQuery(value);

    setTimeout(() => {
      search(value);
    }, 300);
  }

  return (
    <div className="relative">

      <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-bold">
          🎬 Movie App
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <a href="/">Home</a>
          <a href="/favorites">Favorites</a>
        </div>

        {/* Search */}
        <input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search movies..."
          className="px-3 py-1 rounded bg-gray-800 text-white"
        />
      </nav>

      {/* DROPDOWN */}
      {query && results.length > 0 && (
        <div className="absolute top-14 right-6 bg-white text-black w-96 shadow-lg rounded max-h-96 overflow-y-auto z-50">

          {results.slice(0, 8).map((movie) => (
            <div
              key={movie.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2"
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                className="w-10 h-14 object-cover"
              />

              <div>
                <p className="font-bold text-sm">{movie.title}</p>
                <p className="text-xs text-gray-500">
                  {movie.release_date}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}