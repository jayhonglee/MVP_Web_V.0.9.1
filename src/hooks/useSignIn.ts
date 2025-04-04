import { useState, useCallback } from "react";
import supabase from "@/lib/supabase";

interface SignInCredentials {
  email: string;
  password: string;
}

export default function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data.session?.user?.id;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during sign in",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithSession = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;
      if (!session) throw new Error("No session found");

      // Refresh the session to ensure it's still valid
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) throw refreshError;

      return session.user.id;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while restoring session",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    signIn,
    signInWithSession,
    isLoading,
    error,
  };
}
