import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import type { MyListItem } from "../types/movie";
import {
  fetchMyList,
  addToMyList,
  updateMyList,
  removeFromMyList,
} from "../services/myList.service";

import { useAuth } from "./AuthContext";

type MyListContextType = {
  list: MyListItem[];
  loading: boolean;
  addMovie: (movieId: number) => void;
  removeMovie: (movieId: number) => void;
  updateMovie: (movieId: number, updates: Partial<MyListItem>) => void;
  isInList: (movieId: number) => boolean;
  reload: () => Promise<void>;
};

const MyListContext = createContext<MyListContextType | null>(null);

export function MyListProvider({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();

  const [list, setList] = useState<MyListItem[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await fetchMyList();
      setList(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // INIT / RESET ON USER CHANGE
  useEffect(() => {
    if (!ready) return;

    if (!user) {
      setList([]);
      return;
    }

    reload();
  }, [user?.id, ready, reload]);

  // ADD
  const addMovie = useCallback((movieId: number) => {
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

    addToMyList(movieId).catch(() => {
      setList((prev) => prev.filter((m) => m.movieId !== movieId));
    });
  }, []);

  // REMOVE
  const removeMovie = useCallback((movieId: number) => {
    setList((prev) => prev.filter((m) => m.movieId !== movieId));

    removeFromMyList(movieId).catch(() => {
      reload(); // הכי בטוח
    });
  }, [reload]);

  // UPDATE
  const updateMovie = useCallback(
    (movieId: number, updates: Partial<MyListItem>) => {
      setList((prev) =>
        prev.map((item) =>
          item.movieId === movieId
            ? { ...item, ...updates }
            : item
        )
      );

      updateMyList(movieId, updates).catch(() => {
        reload(); // rollback פשוט ונקי
      });
    },
    [reload]
  );

  const isInList = useCallback(
    (movieId: number) =>
      list.some((m) => m.movieId === movieId),
    [list]
  );

  return (
    <MyListContext.Provider
      value={{
        list,
        loading,
        addMovie,
        removeMovie,
        updateMovie,
        isInList,
        reload,
      }}
    >
      {children}
    </MyListContext.Provider>
  );
}

export function useMyListContext() {
  const ctx = useContext(MyListContext);
  if (!ctx) throw new Error("Must be used inside provider");
  return ctx;
}