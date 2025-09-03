import { useQuery } from "@tanstack/react-query";

export const useReadProfilePicture = (userId: string) => {
  const {
    data: avatarUrl,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", "avatar", userId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/users/${userId}/avatar`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load profile picture");
      }

      // Convert the buffer to a blob URL
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  return { avatarUrl, isLoading, error };
};
