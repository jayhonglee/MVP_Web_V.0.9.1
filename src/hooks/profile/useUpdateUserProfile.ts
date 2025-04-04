import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import type { UpdateUserProfileDto, UserProfile } from "./types";
import { fetchUserProfile } from "./useGetUserProfile";
import { convertAddressToPostGIS } from "@/hooks/map/_helper";

export type UpdateUserProfileError = {
  message: string;
  code?: string;
};

const updateUserProfile = async (
  data: UpdateUserProfileDto,
): Promise<UserProfile> => {
  try {
    // Upload new avatar if provided
    let avatarUrl: string | undefined;
    if (data.avatar) {
      const { publicUrl } = await data.avatar.upload("avatars", {
        fileName: `${data.id}-${Date.now()}`,
      });
      avatarUrl = publicUrl;
    }

    // Upload new cover photo if provided
    let coverPhotoUrl: string | undefined;
    if (data.coverPhoto) {
      const { publicUrl } = await data.coverPhoto.upload("covers", {
        fileName: `${data.id}-${Date.now()}`,
      });
      coverPhotoUrl = publicUrl;
    }

    // Prepare update object with only non-null fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = {};

    if (data.name !== undefined) updateData.full_name = data.name;
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.dateOfBirth !== undefined)
      updateData.date_of_birth = data.dateOfBirth.toISOString();
    if (avatarUrl !== undefined) updateData.avatar_url = avatarUrl;
    if (coverPhotoUrl !== undefined) updateData.cover_photo_url = coverPhotoUrl;
    if (data.introduction !== undefined)
      updateData.introduction = data.introduction;

    // Handle address update if provided
    if (data.address !== undefined) {
      // Fetch the current location_id if it exists
      const { data: userData, error: userError } = await supabase
        .from("user_profiles")
        .select("location_id")
        .eq("id", data.id)
        .single();

      if (userError) throw new Error("Failed to fetch current user data");

      const addressData = convertAddressToPostGIS(data.address);

      // Update or create address using upsert
      const { data: upsertedAddress, error: addressError } = await supabase
        .from("addresses")
        .upsert(
          userData?.location_id
            ? { id: userData.location_id, ...addressData }
            : addressData,
          { onConflict: "id" },
        )
        .select()
        .single();

      if (addressError || !upsertedAddress) {
        throw new Error("Failed to update address");
      }

      updateData.location_id = upsertedAddress.id;
    }

    // Update profile
    const { error: profileError } = await supabase
      .from("user_profiles")
      .update(updateData)
      .eq("id", data.id);

    if (profileError) throw new Error("Failed to update profile");

    // Update interests if provided
    if (data.interests !== undefined) {
      // Delete existing interests
      const { error: deleteError } = await supabase
        .from("user_profile_interests")
        .delete()
        .eq("user_profile_id", data.id);

      if (deleteError) throw new Error("Failed to update interests");

      // Insert new interests if any are provided
      if (data.interests.length > 0) {
        const interestRecords = data.interests.map((interestId) => ({
          user_profile_id: data.id,
          interest_id: interestId,
        }));

        const { error: interestsError } = await supabase
          .from("user_profile_interests")
          .insert(interestRecords);

        if (interestsError) throw new Error("Failed to add interests");
      }
    }

    // Use the shared fetchUserProfile function to get the updated profile
    const updatedProfile = await fetchUserProfile(data.id);
    if (!updatedProfile) {
      throw new Error("Failed to fetch updated profile");
    }

    return updatedProfile;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update profile",
    );
  }
};

export default function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, UpdateUserProfileError, UpdateUserProfileDto>(
    {
      mutationFn: updateUserProfile,
      onSuccess: async (data) => {
        // Update the userProfile query data instead of invalidating
        queryClient.setQueryData(["userProfile", data.id], data);
        // If this was the current user's profile, update that as well
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user?.id === data.id) {
          queryClient.setQueryData(["userProfile", "current"], data);
        }
      },
    },
  );
}
