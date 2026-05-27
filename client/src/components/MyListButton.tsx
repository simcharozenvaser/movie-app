import { useMyList } from "../hooks/useMyList";

export default function MyListButton({ movieId }: { movieId: number }) {
  const { addMovie, removeMovie, isInList } = useMyList();

  const inList = isInList(movieId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        inList ? removeMovie(movieId) : addMovie(movieId);
      }}
      className="
        w-11 h-11
        rounded-full
        bg-black/70
        border border-white/10
        flex items-center justify-center
        text-white
        hover:scale-110
        transition
      "
    >
      {inList ? "✔" : "+"}
    </button>
  );
}