import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

interface JoinHangoutResponse {
  message: string;
  dropin: any;
}

export const useJoinHangout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (hangoutId: string): Promise<JoinHangoutResponse> => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/dropins/${hangoutId}/join`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || errorData.error || "Join hangout failed"
        );
      }

      return response.json();
    },
    onSuccess: (_, hangoutId) => {
      // Invalidate and refetch the specific hangout
      queryClient.invalidateQueries({
        queryKey: ["hangout", hangoutId],
      });

      // Invalidate and refetch all hangouts lists
      queryClient.invalidateQueries({
        queryKey: ["hangouts"],
      });

      // Invalidate and refetch user's joined dropins
      queryClient.invalidateQueries({
        queryKey: ["users", "joinedDropins"],
      });

      // Invalidate and refetch created dropins
      queryClient.invalidateQueries({
        queryKey: ["users", "createdDropins"],
      });

      navigate({ to: "/profile/group-chat", replace: true });
      toast.success("Joined hangout successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to join hangout");
      console.error("Join hangout failed:", error);
    },
  });
};
