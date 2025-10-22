import { useMutation } from "@tanstack/react-query";
import { DropinData } from "@/routes/createDropin";
import { toast } from "react-hot-toast";
import useCookie from "../useCookie";

export const useCreateHangout = () => {
  const authToken = useCookie("auth_token");

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (dropinData: DropinData) => {
      const formData = new FormData();

      // Append all the form fields
      formData.append("type", dropinData.type);
      formData.append("title", dropinData.title);

      // Handle date - convert to ISO string
      if (dropinData.date) {
        formData.append("date", dropinData.date.toISOString());
      }

      formData.append("location", dropinData.location);
      formData.append("address", dropinData.address);
      formData.append("navigation", dropinData.navigation);
      formData.append("description", dropinData.description);

      // Handle image file
      if (dropinData.dropInImage) {
        formData.append("dropInImage", dropinData.dropInImage);
      }

      const response = await fetch(
        `${import.meta.env.VITE_MONGODB_URL}/dropins/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || data.message || "Create hangout failed");
      }

      return response.json();
    },

    onSuccess: () => {
      toast.success("Hangout created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create hangout");
      console.error("Create hangout failed:", error);
    },
  });

  return { mutate, isPending, error };
};
