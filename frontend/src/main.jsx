import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { AuthContextProvider } from "./store/authStore.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthContextProvider>
    <App />
    <Toaster richColors closeButton duration={2000}></Toaster>
  </AuthContextProvider>
  // </StrictMode>
);
