import { useMyListContext } from "../context/MyListContext";

export function useMyList() {
  return useMyListContext();
}