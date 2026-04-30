import { useFavorites } from "../hooks/useFavorites";

type Props = {
  movieId: number;
  className?: string;
};

export default function FavoriteButton({ movieId, className }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(movieId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(movieId);
      }}
      className={className}
    >
      {favorite ? "❤️" : "🤍"}
    </button>
  );
}