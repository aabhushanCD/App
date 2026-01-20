import { AuthContext } from "@/context/context";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
