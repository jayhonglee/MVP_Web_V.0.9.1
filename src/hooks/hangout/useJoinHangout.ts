import { useMutation, useQueryClient } from "@tanstack/react-query";

interface JoinHangoutResponse {
  message: string;
  dropin: any;
}

export const useJoinHangout = () => {
  const queryClient = useQueryClient();

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
    onSuccess: (data, hangoutId) => {
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
    },
  });
};
