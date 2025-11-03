import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { AuthContextProvider } from "./store/AuthStore";
import { NotificationProvider } from "./store/NotificationStore";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthContextProvider>
    <NotificationProvider>
      <App />
      <Toaster richColors closeButton duration={2000}></Toaster>
    </NotificationProvider>
  </AuthContextProvider>
  // </StrictMode>
);
