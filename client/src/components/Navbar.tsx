import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSearchMovies } from "../hooks/useSearchMovies";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false); // mobile search toggle

  const { user, logout } = useAuth();
  const { search, results } = useSearchMovies();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement | null>(null);

  const isMoviePage = location.pathname.startsWith("/movie/");

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setQuery("");
        search("");
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [search]);

  function handleSearchInput(value: string) {
    setQuery(value);
    search(value);
  }

  function handleResultClick(id: number) {
    navigate(`/movie/${id}`);
    setQuery("");
    setSearchOpen(false);
  }

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50"
      style={{ background: "rgba(10,10,10,0.97)", borderBottom: "1px solid #1a1a1a" }}
    >
      {/* ── DESKTOP ROW (single row, ≥ md) ── */}
      <div className="hidden md:flex items-center h-[60px] px-6 gap-6">
        {/* Logo */}
        <Logo />

        {/* Nav links — center */}
        <div className="flex items-center gap-5 mx-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/discover">Discover</NavLink>
          <NavLink to="/my-list">My List</NavLink>
        </div>

        {/* Right: search + user */}
        <div className="flex items-center gap-4 shrink-0">
          {!isMoviePage && (
            <SearchBox
              containerRef={searchRef}
              query={query}
              results={results}
              onInput={handleSearchInput}
              onResultClick={handleResultClick}
            />
          )}
          {user && <UserBadge username={user.username} onLogout={logout} />}
        </div>
      </div>

      {/* ── MOBILE ROW (< md) ── */}
      <div className="flex md:hidden items-center h-[56px] px-4 gap-3">
        {/* Logo */}
        <Logo />

        {/* Nav links — small, scrollable */}
        <div className="flex items-center gap-4 mx-auto overflow-x-auto scrollbar-hide">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/discover">Discover</NavLink>
          <NavLink to="/my-list">My List</NavLink>
        </div>

        {/* Right: search icon + avatar */}
        <div className="flex items-center gap-2 shrink-0">
          {!isMoviePage && (
            <button
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Search"
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}
          {user && (
            <button
              onClick={logout}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "#1f1f1f", border: "1px solid #2f2f2f", color: "rgba(255,255,255,0.7)" }}
              title={`Logout ${user.username}`}
            >
              {user.username?.charAt(0).toUpperCase()}
            </button>
          )}
        </div>
      </div>

      {/* ── MOBILE SEARCH PANEL — fixed independently, below navbar ── */}
      {searchOpen && !isMoviePage && (
        <div
          ref={searchRef}
          className="md:hidden fixed top-[56px] left-0 w-full px-4 pb-3 z-40"
          style={{ background: "rgba(10,10,10,0.97)", borderBottom: "1px solid #1a1a1a" }}
        >
          <input
            autoFocus
            value={query}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder="Search movies…"
            className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
            style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
          />
          {query && results.length > 0 && (
            <div
              className="mt-2 rounded-xl overflow-hidden"
              style={{ background: "#141414", border: "1px solid #2a2a2a" }}
            >
              {results.slice(0, 6).map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => handleResultClick(movie.id)}
                  className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                  style={{ color: "rgba(255,255,255,0.75)", borderBottom: "1px solid #1f1f1f" }}
                >
                  {movie.title}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <span className="font-black text-xl leading-none" style={{ color: "#e50914" }}>N</span>
      <div className="flex flex-col leading-none">
        <span className="text-white font-semibold text-xs tracking-widest">MOVIE</span>
        <span className="text-[8px] tracking-[4px] font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>STREAM</span>
      </div>
    </Link>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className="text-sm font-medium whitespace-nowrap transition-colors"
      style={{ color: active ? "white" : "rgba(255,255,255,0.45)" }}
    >
      {children}
    </Link>
  );
}

function UserBadge({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full px-2 py-1 transition-colors"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: "#2a2a2a", color: "rgba(255,255,255,0.7)" }}
        >
          {username?.charAt(0).toUpperCase()}
        </div>
        <span className="text-xs hidden lg:block" style={{ color: "rgba(255,255,255,0.5)" }}>
          {username}
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-10 w-40 rounded-xl py-1 z-50"
          style={{ background: "#161616", border: "1px solid #2a2a2a" }}
        >
          <div className="px-3 py-2 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {username}
          </div>
          <div style={{ borderTop: "1px solid #1f1f1f" }} />
          <button
            onClick={onLogout}
            className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-white/5"
            style={{ color: "#f87171" }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

// Desktop search box
const SearchBox = ({
  query,
  results,
  onInput,
  onResultClick,
  containerRef,
}: {
  query: string;
  results: { id: number; title: string }[];
  onInput: (v: string) => void;
  onResultClick: (id: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => (
  <div ref={containerRef} className="relative">
    <input
      value={query}
      onChange={(e) => onInput(e.target.value)}
      placeholder="Search…"
      className="text-sm text-white outline-none rounded-xl px-3 py-1.5"
      style={{
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        width: "180px",
      }}
    />
    {query && results.length > 0 && (
      <div
        className="absolute top-9 right-0 w-72 rounded-xl overflow-hidden z-50"
        style={{ background: "#141414", border: "1px solid #2a2a2a" }}
      >
        {results.slice(0, 8).map((movie) => (
          <button
            key={movie.id}
            onClick={() => onResultClick(movie.id)}
            className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.75)", borderBottom: "1px solid #1f1f1f" }}
          >
            {movie.title}
          </button>
        ))}
      </div>
    )}
  </div>
);