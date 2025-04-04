import { useState } from "react";
import supabase from "@/lib/supabase";

interface SignUpCredentials {
  email: string;
  password: string;
}

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (credentials: SignUpCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: authError } =
        await supabase.auth.signUp(credentials);

      if (authError) {
        if (authError.message.includes("already registered")) {
          throw new Error(
            "This email is already registered. Please try signing in instead.",
          );
        }
        throw authError;
      }

      if (!data.user) {
        throw new Error("Failed to create user");
      }

      return { success: true, userId: data.user.id };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during sign up";
      setError(errorMessage);
      return { success: false, userId: null };
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
}
