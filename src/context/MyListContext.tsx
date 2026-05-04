import { createContext, useContext, useEffect, useState } from "react";
import type { MyListItem } from "../types/movie";

const STORAGE_KEY = "myList";

type MyListContextType = {
  list: MyListItem[];
  addMovie: (movieId: number) => void;
  removeMovie: (movieId: number) => void;
  updateMovie: (movieId: number, updates: Partial<MyListItem>) => void;
  isInList: (movieId: number) => boolean;
};

const MyListContext = createContext<MyListContextType | null>(null);

export function MyListProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<MyListItem[]>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  
  // 💾 save on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  function addMovie(movieId: number) {
    setList((prev) => {
      if (prev.some((m) => m.movieId === movieId)) return prev;

      return [
        ...prev,
        {
          movieId,
          status: "want_to_watch",
          myRating: null,
          myNotes: "",
        },
      ];
    });
  }

  function removeMovie(movieId: number) {
    setList((prev) => prev.filter((m) => m.movieId !== movieId));
  }

  function updateMovie(movieId: number, updates: Partial<MyListItem>) {
    setList((prev) =>
      prev.map((item) =>
        item.movieId === movieId ? { ...item, ...updates } : item,
      ),
    );
  }

  function isInList(movieId: number) {
    return list.some((m) => m.movieId === movieId);
  }

  return (
    <MyListContext.Provider
      value={{ list, addMovie, removeMovie, updateMovie, isInList }}
    >
      {children}
    </MyListContext.Provider>
  );
}

export function useMyListContext() {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error("useMyListContext must be used inside MyListProvider");
  }
  return context;
}
