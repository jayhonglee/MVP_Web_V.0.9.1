import { AuthContext } from "./auth.types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: false,
        user: null,
        isLoading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
