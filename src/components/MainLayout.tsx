import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      
      <header className="bg-black text-white p-4">
        <h1 className="text-xl font-bold">🎬 Movie App</h1>
      </header>

      <main className="flex-1 p-4 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white text-center p-3 text-sm">
        Movie App © {new Date().getFullYear()}
      </footer>

    </div>
  );
}