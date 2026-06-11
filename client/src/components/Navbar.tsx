import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSearchMovies } from "../hooks/useSearchMovies";

export default function Navbar() {
  const [query, setQuery] = useState("");

  const { user, logout } = useAuth();
  const { search, results } = useSearchMovies();

  const navigate = useNavigate();

  const searchRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setQuery("");
        search("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isMoviePage = location.pathname.startsWith("/movie/");

  return (
    <nav
      className="fixed top-0 left-0 w-full h-[68px] bg-black/95 border-b border-gray-800 flex items-center px-6 z-50"
    >
      {/* LEFT SIDE (actions) */}
      <div className="flex items-center gap-3 w-1/4">
        {user && (
          <button
            onClick={logout}
            className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-500"
          >
            Logout
          </button>
        )}

        {user && (
          <div className="flex items-center gap-2 text-sm text-gray-300 px-2">
            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
              {user.username?.charAt(0).toUpperCase()}
            </div>
            {user.username}
          </div>
        )}
      </div>

      {/* CENTER NAV */}
      <div className="flex items-center justify-center gap-6 mx-auto w-1/2">
        <Link className="text-gray-300 hover:text-white" to="/">
          Home
        </Link>

        <Link className="text-gray-300 hover:text-white" to="/discover">
          Discover
        </Link>

        <Link className="text-gray-300 hover:text-white" to="/my-list">
          My List
        </Link>
      </div>

      {/* RIGHT SIDE (logo + search) */}
      <div className="flex items-center gap-4 w-1/4">
        {/* SEARCH */}
        {!isMoviePage && (
          <div ref={searchRef} className="relative">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                search(e.target.value);
              }}
              placeholder="Search Movie..."
              className="
                w-[200px]
                transition-all duration-300
                px-3 py-1
                bg-gray-800
                rounded
                text-white
                outline-none
              "
            />

            {query && results.length > 0 && (
              <div className="absolute top-10 right-0 w-80 bg-gray-900 border border-gray-700 rounded shadow-lg max-h-72 overflow-auto">
                {results.slice(0, results.length).map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => {
                      navigate(`/movie/${movie.id}`);
                      setQuery("");
                    }}
                    className="p-2 hover:bg-gray-800 cursor-pointer text-sm"
                  >
                    {movie.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* LOGO */}
        <div className="flex items-center gap-2 font-bold">
          <span className="text-red-600 text-xl">N</span>

          <div className="flex flex-col leading-tight">
            <span className="text-white tracking-wide">MOVIE</span>
            <span className="text-[9px] text-gray-500 tracking-[3px]">
              STREAM
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
