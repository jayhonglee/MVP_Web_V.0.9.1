import { createContext } from "react";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
