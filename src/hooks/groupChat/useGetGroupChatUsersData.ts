import { useQuery } from "@tanstack/react-query";

export interface GroupChatUser {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export const useGetGroupChatUsersData = (groupChatId: string) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groupChat", "users", groupChatId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/groupChats/${groupChatId}/users`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Group chat not found");
        }
        throw new Error("Failed to load group chat users");
      }

      const data = await response.json();

      // Process each user to convert avatar buffers to blob URLs
      const processedData = await Promise.all(
        data.map(async (user: any) => {
          if (user.avatar && user.avatar.data) {
            try {
              // Convert Buffer array to Uint8Array
              const uint8Array = new Uint8Array(user.avatar.data);

              // Create blob from the binary data
              const blob = new Blob([uint8Array], { type: "image/png" });

              // Create object URL
              const blobUrl = URL.createObjectURL(blob);

              return {
                ...user,
                avatar: blobUrl,
              };
            } catch (error) {
              console.error("Error converting avatar buffer:", error);
              return user; // Return original if conversion fails
            }
          }
          return user;
        })
      );

      return processedData;
    },
    enabled: !!groupChatId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return { users, isLoading, error };
};
