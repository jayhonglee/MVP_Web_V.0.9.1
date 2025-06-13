import { useState, useEffect } from "react";
import { AuthContext } from "./auth.types";
import { authService } from "./auth.service";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.verify();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        console.error("Auth verification failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        signUp: async (userData: {
          email: string;
          password: string;
          firstName: string;
          lastName: string;
        }) => {
          try {
            const response = await authService.signup(userData);
            setUser(response);
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Sign up failed:", error);
            throw error;
          }
        },
        signIn: async (email: string, password: string) => {
          if (email && password) {
            try {
              const userData = await authService.login({ email, password });
              setUser(userData);
              setIsAuthenticated(true);
            } catch (error) {
              console.error("Sign in failed:", error);
              throw error;
            }
          }
        },
        signOut: async () => {
          try {
            await authService.logout();
          } catch (error) {
            console.error("Sign out failed:", error);
          } finally {
            setUser(null);
            setIsAuthenticated(false);
          }
        },
        verify: async () => {
          try {
            const userData = await authService.verify();
            setUser(userData);
            setIsAuthenticated(true);
          } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            console.error("Auth verification failed:", error);
          } finally {
            setIsLoading(false);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
