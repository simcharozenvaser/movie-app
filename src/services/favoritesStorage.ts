const FAVORITES_KEY = "favorite_movies";

/**
 * Get all favorite movie IDs
 */
export function getFavorites(): number[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);

  } catch (error) {
    console.error("Failed to read favorites:", error);
    return [];
  }
}

/**
 * Save favorites array to localStorage
 */
function saveFavorites(favorites: number[]) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
}

/**
 * Add movie to favorites
 */
export function addFavorite(movieId: number) {
  const favorites = getFavorites();

  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    saveFavorites(favorites);
  }
}

/**
 * Remove movie from favorites
 */
export function removeFavorite(movieId: number) {
  const favorites = getFavorites().filter(
    (id) => id !== movieId
  );

  saveFavorites(favorites);
}

/**
 * Toggle favorite status
 */
export function toggleFavorite(movieId: number) {
  const favorites = getFavorites();

  if (favorites.includes(movieId)) {
    removeFavorite(movieId);
  } else {
    addFavorite(movieId);
  }
}

/**
 * Check if movie is favorite
 */
export function isFavorite(movieId: number): boolean {
  const favorites = getFavorites();

  return favorites.includes(movieId);
}