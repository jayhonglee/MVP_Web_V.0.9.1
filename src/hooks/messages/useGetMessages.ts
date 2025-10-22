import { useQuery } from "@tanstack/react-query";
import useCookie from "../useCookie";

export const useGetMessages = (groupChatId: string) => {
  const authToken = useCookie("auth_token");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["messages", groupChatId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/messages/${groupChatId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Group chat not found.");
        }
        if (response.status === 403) {
          throw new Error("You are not a member of this group chat.");
        }
        const data = await response.json();
        throw new Error(data.error || data.message || "Get messages failed");
      }

      return response.json();
    },
    enabled: !!groupChatId, // Only run query if groupChatId is provided
  });

  return {
    messages: data,
    isLoading,
    error,
    refetch,
  };
};
