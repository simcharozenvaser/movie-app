import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "he-IL",
  },
});