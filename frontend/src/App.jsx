import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./store/AuthStore";

function App() {
 
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
