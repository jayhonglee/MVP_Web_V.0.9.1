import { useMutation } from "@tanstack/react-query";
import useCookie from "../useCookie";

interface MessageData {
  groupChat: string;
  text: string;
}

export const useCreateMessage = () => {
  const authToken = useCookie("auth_token");

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (messageData: MessageData) => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            groupChat: messageData.groupChat,
            text: messageData.text,
          }),
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
        throw new Error(data.error || data.message || "Create message failed");
      }

      return response.json();
    },

    onError: (error) => {
      console.error("Create message failed:", error);
    },
  });

  return { mutate, isPending, error };
};
