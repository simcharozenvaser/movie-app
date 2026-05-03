const STORAGE_KEY = "myList";
const EVENT_NAME = "my-list-changed";

export type MyListItem = {
  movieId: number;
  status: "watched" | "want_to_watch";
  myRating: number | null;
  myNotes: string;
};

export function getMyList(): MyListItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function save(list: MyListItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT_NAME)); // 🔥 חשוב מאוד
}

export function addMovieToMyList(movieId: number) {
  const list = getMyList();
  if (list.some((m) => m.movieId === movieId)) return;

  save([
    ...list,
    {
      movieId,
      status: "want_to_watch",
      myRating: null,
      myNotes: "",
    },
  ]);
}

export function removeMovieFromMyList(movieId: number) {
  const list = getMyList();
  save(list.filter((m) => m.movieId !== movieId));
}

export function updateMyListItem(
  movieId: number,
  updates: Partial<MyListItem>
) {
  const list = getMyList();

  const updated = list.map((item) =>
    item.movieId === movieId
      ? { ...item, ...updates }
      : item
  );

  save(updated);
}

export function isInMyList(movieId: number) {
  return getMyList().some((m) => m.movieId === movieId);
}

export function subscribeMyList(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}