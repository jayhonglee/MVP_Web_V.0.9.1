import { useQuery } from "@tanstack/react-query";
import useCookie from "../useCookie";

export const useJoinedDropins = (userId: string) => {
  const authToken = useCookie("auth_token");

  const {
    data: joinedDropins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", "joinedDropins", userId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/users/me/joinedDropins`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load joined dropins");
      }

      const data = await response.json();

      // Process each dropin to convert image buffers to blob URLs
      const processedData = await Promise.all(
        data.map(async (dropin: any) => {
          if (dropin.dropInImage && dropin.dropInImage.data) {
            try {
              // Convert Buffer array to Uint8Array
              const uint8Array = new Uint8Array(dropin.dropInImage.data);

              // Create blob from the binary data
              const blob = new Blob([uint8Array], { type: "image/jpeg" });

              // Create object URL
              const blobUrl = URL.createObjectURL(blob);

              return {
                ...dropin,
                dropInImage: blobUrl,
              };
            } catch (error) {
              console.error("Error converting image buffer:", error);
              return dropin; // Return original if conversion fails
            }
          }
          return dropin;
        })
      );

      return processedData;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  return { joinedDropins, isLoading, error };
};
