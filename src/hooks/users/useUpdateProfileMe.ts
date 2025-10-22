import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth/useAuth";
import { toast } from "react-hot-toast";
import useCookie from "../useCookie";

export const useUpdateProfilePictureMe = () => {
  const { updateUser } = useAuth();
  const authToken = useCookie("auth_token");

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/users/me/avatar`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || data.message || "Update profile picture failed"
        );
      }

      // The backend returns an empty response on success
      return response.json();
    },
    onSuccess: (data) => {
      // Update the user's avatar with the new data
      if (data?.user?.avatar) {
        updateUser({ avatar: data.user.avatar });
        toast.success("Profile picture updated successfully");
      }
    },
    onError: (error) => {
      console.error("Profile picture update failed:", error);
      toast.error(error.message || "Failed to update profile picture");
    },
  });

  return { mutate, isPending, error };
};
