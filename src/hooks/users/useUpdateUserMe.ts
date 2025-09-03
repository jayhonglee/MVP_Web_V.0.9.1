import { User } from "@/context/auth/auth.types";
import { useAuth } from "@/context/auth/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserMe = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (userData: Partial<User["user"]>) => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/users/me`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Update failed");
      }

      return response.json();
    },
    onSuccess: (updatedUserData) => {
      // Update the auth state with the new data
      updateUser(updatedUserData.user);

      // Also invalidate queries for consistency
      queryClient.invalidateQueries({ queryKey: ["auth", "verify"] });
    },
  });

  return { mutate, isPending, error };
};
