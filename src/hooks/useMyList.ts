import { useCallback, useEffect, useState } from "react";
import {
  getMyList,
  addMovieToMyList,
  removeMovieFromMyList,
  updateMyListItem,
  isInMyList,
  subscribeMyList,
  type MyListItem,
} from "../services/myListStorage";

export function useMyList() {
  const [list, setList] = useState<MyListItem[]>([]);

  useEffect(() => {
    setList(getMyList());

    const unsub = subscribeMyList(() => {
      setList(getMyList());
    });

    return unsub;
  }, []);

  const addMovie = useCallback((movieId: number) => {
    addMovieToMyList(movieId);
    setList(getMyList());
  }, []);

  const removeMovie = useCallback((movieId: number) => {
    removeMovieFromMyList(movieId);
    setList(getMyList());
  }, []);

  const updateMovie = useCallback(
    (movieId: number, updates: Partial<MyListItem>) => {
      updateMyListItem(movieId, updates);
      setList(getMyList());
    },
    []
  );

  const isInList = useCallback(
    (movieId: number) => isInMyList(movieId),
    []
  );

  return {
    list,
    addMovie,
    removeMovie,
    updateMovie,
    isInList,
  };
}