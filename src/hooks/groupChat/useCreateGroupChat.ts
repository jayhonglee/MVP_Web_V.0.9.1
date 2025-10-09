import { useMutation } from "@tanstack/react-query";

interface GroupChatData {
  dropinId: string;
}

export const useCreateGroupChat = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (groupChatData: GroupChatData) => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/groupChats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            dropinId: groupChatData.dropinId,
          }),
        }
      );

      if (!response.ok) {
        // Handle 500 error for existing group chat
        if (response.status === 500) {
          const errorText = await response.text();
          throw new Error(
            errorText || "A group chat for this dropin already exists."
          );
        }

        const data = await response.json();
        throw new Error(
          data.error || data.message || "Create group chat failed"
        );
      }

      return response.json();
    },

    onError: (error) => {
      console.error("Create group chat failed:", error);
    },
  });

  return { mutate, isPending, error };
};
