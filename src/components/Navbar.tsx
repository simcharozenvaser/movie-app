import { useState, useEffect } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const { results, search } = useSearchMovies();
  const navigate = useNavigate();
  const location = useLocation();
  const isMoviePage = location.pathname.startsWith("/movie/");
  const isFavoritesPage = location.pathname.startsWith("/favorites");

  const hideSearch = isMoviePage || isFavoritesPage;

  useEffect(() => {
    const id = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">🎬 Movie App</div>

        {/* Links */}
        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        {/* Search */}
        {!hideSearch && (
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="px-3 py-1 rounded bg-gray-800 text-white"
          />
        )}
      </nav>

      {/* DROPDOWN */}
      {!isMoviePage && query && results.length > 0 && (
        <div className="absolute top-14 right-6 w-96 bg-gray-900 text-white shadow-2xl rounded-lg max-h-96 overflow-y-auto z-50 border border-gray-800">
          {results.slice(0, 8).map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                navigate(`/movie/${movie.id}`);
                setQuery("");
              }}
              className="p-2 hover:bg-gray-800 cursor-pointer flex gap-2"
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                className="w-10 h-14 object-cover"
              />

              <div>
                <p className="font-bold text-sm">{movie.title}</p>
                <p className="text-xs text-gray-500">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
