import { useEffect, useState } from "react";
import {
  getFavorites,
  toggleFavorite,
} from "../services/favoritesStorage";

export function useFavorites() {
  const [favorites, setFavorites] =
    useState<number[]>([]);

  useEffect(() => {
    function sync() {
      setFavorites(getFavorites());
    }

    sync();

    window.addEventListener(
      "favorites-changed",
      sync
    );

    return () => {
      window.removeEventListener(
        "favorites-changed",
        sync
      );
    };
  }, []);

  function handleToggle(movieId: number) {
    toggleFavorite(movieId);
  }

  function isFav(movieId: number) {
    return favorites.includes(movieId);
  }

  return {
    favorites,
    toggleFavorite: handleToggle,
    isFavorite: isFav,
  };
}