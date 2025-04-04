import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import type { CreateHangoutDto } from "./types";
import { prepareAddressForDb } from "@/hooks/map/address";

export default function useCreateHangout() {
  const queryClient = useQueryClient();

  const createHangout = async (data: CreateHangoutDto) => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User must be logged in to create a hangout");
    }

    // Upload cover image if provided
    let coverImageUrl = "";
    if (data.coverImage) {
      const { publicUrl } = await data.coverImage.upload("hangout-covers", {
        fileName: `${user.id}-${Date.now()}`,
      });
      coverImageUrl = publicUrl;
    }

    // Create address record
    const { data: locationData, error: locationError } = await supabase
      .from("addresses")
      .insert(prepareAddressForDb(data.location))
      .select()
      .single();

    if (locationError || !locationData) {
      throw new Error("Failed to create location");
    }

    // Create hangout
    const { data: hangout, error: hangoutError } = await supabase
      .from("hangouts")
      .insert({
        host_id: user.id,
        type: data.type,
        title: data.title,
        description: data.description,
        cover_image_url: coverImageUrl || null,
        scheduled_when: data.scheduled_when.toISOString(),
        location_id: locationData.id,
        navigation_instruction: data.navigationInstruction || null,
        group_size: data.groupSize,
      })
      .select(
        `
        *,
        addresses!hangouts_location_id_fkey(*)
      `,
      )
      .single();

    if (hangoutError) {
      throw new Error(hangoutError.message);
    }

    // Transform the data to match our Hangout type
    const transformedHangout = {
      ...hangout,
      scheduled_when: new Date(hangout.scheduled_when),
      location: hangout.addresses,
      created_at: new Date(hangout.created_at),
      updated_at: new Date(hangout.updated_at),
    };
    delete transformedHangout.addresses;
    delete transformedHangout.location_id;

    return transformedHangout;
  };

  return useMutation({
    mutationFn: createHangout,
    onSuccess: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["hangouts"] });
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["user-hangouts", user.id] });
      }
    },
  });
}
