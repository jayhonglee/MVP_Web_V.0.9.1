import { useState } from "react";
import { AuthContext } from "./auth.types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: null,
        isLoading: false,
        signIn: () => {
          setIsAuthenticated(true);
        },
        signOut: () => {
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
