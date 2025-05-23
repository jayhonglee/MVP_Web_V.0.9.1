import { createContext } from "react";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
