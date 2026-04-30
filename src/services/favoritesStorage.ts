const FAVORITES_KEY = "favorite_movies";

function emitChange() {
  window.dispatchEvent(
    new Event("favorites-changed")
  );
}

export function getFavorites(): number[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: number[]) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );

  emitChange();
}

export function toggleFavorite(movieId: number) {
  const favorites = getFavorites();

  const updated = favorites.includes(movieId)
    ? favorites.filter((id) => id !== movieId)
    : [...favorites, movieId];

  saveFavorites(updated);
}

export function isFavorite(movieId: number) {
  return getFavorites().includes(movieId);
}