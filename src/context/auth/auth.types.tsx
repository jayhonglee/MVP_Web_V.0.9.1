import { createContext } from "react";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  verify: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
