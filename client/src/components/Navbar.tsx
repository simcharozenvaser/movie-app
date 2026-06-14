import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSearchMovies } from "../hooks/useSearchMovies";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const { user, logout } = useAuth();
  const { search, results } = useSearchMovies();
  const navigate = useNavigate();
  const location = useLocation();

  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setQuery("");
        search("");
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMoviePage = location.pathname.startsWith("/movie/");

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/95 border-b border-gray-800 z-50">
      {/* MAIN ROW */}
      <div className="flex items-center h-[68px] px-4 md:px-6 gap-3">
        {/* USER */}
        {user && (
          <>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-300 px-2">
              <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              {user.username}
            </div>
            <button
              onClick={logout}
              className="hidden md:block px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-500"
            >
              Logout
            </button>
            {/* mobile: just avatar that logs out on long press / tap */}
            <button
              onClick={logout}
              className="md:hidden w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white"
              title={`Logout ${user.username}`}
            >
              {user.username?.charAt(0).toUpperCase()}
            </button>
          </>
        )}

        {/* CENTER NAV */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mx-auto">
          <Link className="text-gray-300 hover:text-white text-sm" to="/">
            Home
          </Link>
          <Link
            className="text-gray-300 hover:text-white text-sm"
            to="/discover"
          >
            Discover
          </Link>
          <Link
            className="text-gray-300 hover:text-white text-sm"
            to="/my-list"
          >
            My List
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 shrink-0">
          {/* SEARCH — desktop */}
          {!isMoviePage && (
            <div ref={searchRef} className="relative hidden md:block">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  search(e.target.value);
                }}
                placeholder="Search Movie..."
                className="w-[200px] transition-all duration-300 px-3 py-1 bg-gray-800 rounded text-white outline-none text-sm"
              />
              {query && results.length > 0 && (
                <div className="absolute top-10 right-0 w-80 bg-gray-900 border border-gray-700 rounded shadow-lg max-h-72 overflow-auto">
                  {results.map((movie) => (
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

          {/* SEARCH ICON — mobile */}
          {!isMoviePage && (
            <button
              onClick={() => setSearchOpen((o) => !o)}
              className="md:hidden text-gray-400 hover:text-white p-1"
              aria-label="Search"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}
          
          {/* LOGO */}
          <div className="flex items-center gap-2 font-bold shrink-0">
            <span className="text-red-600 text-xl">N</span>
            <div className="flex flex-col leading-tight">
              <span className="text-white tracking-wide text-sm">MOVIE</span>
              <span className="text-[9px] text-gray-500 tracking-[3px]">
                STREAM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH BAR — slides in below navbar */}
      {searchOpen && !isMoviePage && (
        <div ref={searchRef} className="md:hidden px-4 pb-3 bg-black/95">
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              search(e.target.value);
            }}
            placeholder="Search Movie..."
            className="w-full px-3 py-2 bg-gray-800 rounded text-white outline-none text-sm"
          />
          {query && results.length > 0 && (
            <div className="mt-1 w-full bg-gray-900 border border-gray-700 rounded shadow-lg max-h-60 overflow-auto">
              {results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => {
                    navigate(`/movie/${movie.id}`);
                    setQuery("");
                    setSearchOpen(false);
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
    </nav>
  );
}
