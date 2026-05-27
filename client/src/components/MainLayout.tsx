import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 max-w-6xl mx-auto w-full pt-24">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white text-center p-3 text-sm">
        Movie App © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
