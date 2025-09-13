import { useQuery } from "@tanstack/react-query";

export const useGetHangout = (hangoutId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["hangout", hangoutId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/dropins/${hangoutId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || data.message || "Get hangout failed");
      }

      return response.json();
    },
    enabled: !!hangoutId, // Only run query if hangoutId is provided
  });

  return {
    hangout: data,
    isLoading,
    error,
    refetch,
  };
};
