import { User } from "@/context/auth/auth.types";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserMe = () => {
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
  });

  return { mutate, isPending, error };
};
