import { useQuery } from "@tanstack/react-query";

export const useCreatedDropins = (userId: string) => {
  const {
    data: createdDropins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", "createdDropins", userId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/users/me/createdDropins`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load created dropins");
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

  return { createdDropins, isLoading, error };
};
