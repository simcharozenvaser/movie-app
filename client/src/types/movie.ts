export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;

  genre_ids?: number[];
  genres?: { id: number; name: string }[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type MyListItem = {
  movieId: number;
  status: "watched" | "want_to_watch";
  myRating: number | null;
  myNotes: string;
};
