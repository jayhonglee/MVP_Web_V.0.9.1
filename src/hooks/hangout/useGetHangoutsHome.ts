import { useQuery } from "@tanstack/react-query";

export const useGetHangoutsHome = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["hangouts", "home"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/dropins/home`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || errorData.message || "Get hangouts home failed"
        );
      }

      return response.json();
    },
  });

  return {
    hangouts: data,
    isLoading,
    error,
    refetch,
  };
};
