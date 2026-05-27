import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MyListPage from "./pages/MyListPage";
import GenresPage from "./pages/GenresPage";
import AuthPage from "./auth/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public auth */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected app */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<MovieDetailsPage />} />
          <Route path="my-list" element={<MyListPage />} />
          <Route path="genres" element={<GenresPage />} />
        </Route>
      </Route>
    </Routes>
  );
}