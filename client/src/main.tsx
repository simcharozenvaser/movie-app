import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MyListProvider } from "./context/MyListContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.tsx";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MyListProvider>
          <App />
        </MyListProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);