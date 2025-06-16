import { createContext } from "react";

interface UserAddress {
  placeName?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
}

interface User {
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    gender?: string;
    dateOfBirth?: string;
    address?: UserAddress;
    avatar?: string;
    introduction?: string;
    interests?: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  verify: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export type { User, UserAddress };
