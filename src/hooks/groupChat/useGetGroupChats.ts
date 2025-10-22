import { useQuery } from "@tanstack/react-query";
import useCookie from "../useCookie";

export const useGetGroupChats = () => {
  const authToken = useCookie("auth_token");

  const {
    data: groupChats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", "groupChats"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/groupChats/me`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load group chats");
      }

      const data = await response.json();
      return data;
    },
    enabled: true,
    staleTime: 0, // Always consider data stale to force refetch
    gcTime: 0, // Don't cache data
    refetchOnMount: true, // Always refetch when component mounts
  });

  return { groupChats, isLoading, error };
};
