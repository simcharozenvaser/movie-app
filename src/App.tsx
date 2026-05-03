import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MyListPage from "./pages/MyListPage";
import GenresPage from "./pages/GenresPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Home */}
        <Route index element={<HomePage />} />

        {/* Movie Details */}
        <Route path="movie/:id" element={<MovieDetailsPage />} />

        {/* NEW: My List */}
        <Route path="my-list" element={<MyListPage />} />
        <Route path="genres" element={<GenresPage />} />
      </Route>
    </Routes>
  );
}
