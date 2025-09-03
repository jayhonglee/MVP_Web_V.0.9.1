import { useMutation } from "@tanstack/react-query";

export const useUpdateProfilePictureMe = () => {
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
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || data.message || "Update profile picture failed"
        );
      }

      // The backend returns an empty response on success
      return response;
    },
  });

  return { mutate, isPending, error };
};
