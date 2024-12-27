import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Routers from "./component/router/routes";
import { AuthContextProvider } from "./component/store/auth.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
    <BrowserRouter>
      <Routers>
        <App />
      </Routers>
    </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);
