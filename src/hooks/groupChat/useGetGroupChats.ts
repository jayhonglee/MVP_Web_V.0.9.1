import { useQuery } from "@tanstack/react-query";

export const useGetGroupChats = (userId: string) => {
  const {
    data: groupChats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", "groupChats", userId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/groupChats/me`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load group chats");
      }

      const data = await response.json();
      return data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  return { groupChats, isLoading, error };
};
