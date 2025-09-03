import { useEffect, useState } from "react";
import { AuthContext, User } from "./auth.types";
import { authService } from "./auth.service";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const processUserData = (userData: any) => {
    if (userData?.user?.avatar) {
      try {
        const blob = new Blob([userData.user.avatar], {
          type: "image/png",
        });
        const avatarUrl = URL.createObjectURL(blob);

        return {
          ...userData,
          user: {
            ...userData.user,
            avatar: avatarUrl,
          },
        };
      } catch (error) {
        console.error("Failed to convert buffer to URL:", error);
      }
    }
    return userData;
  };

  // Initialize authentication state on app startup
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userData = await authService.verify();
        const processedUserData = processUserData(userData);
        setUser(processedUserData);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        console.error("Auth verification failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signUp = async (userData: {
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
  };

  const signIn = async (email: string, password: string) => {
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
  };

  const signOut = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const verify = async () => {
    try {
      const userData = await authService.verify();
      const processedUserData = processUserData(userData);
      setUser(processedUserData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      console.error("Auth verification failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: Partial<User["user"]>) => {
    if (user) {
      setUser({ user: { ...user.user, ...userData } });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        signUp,
        signIn,
        signOut,
        verify,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
