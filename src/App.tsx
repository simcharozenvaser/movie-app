import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/Home";
import FavoritesPage from "./pages/Favorites";
import MovieDetailsPage from "./pages/MovieDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="movie/:id" element={<MovieDetailsPage />} />
      </Route>
    </Routes>
  );
}