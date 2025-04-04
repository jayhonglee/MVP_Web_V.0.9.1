import { useState } from "react";
import supabase from "@/lib/supabase";
import type { UserProfileDto } from "./types";
import { convertAddressToPostGIS } from "@/hooks/map/_helper";

export default function useCreateUserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfile = async (data: UserProfileDto) => {
    try {
      setIsLoading(true);
      setError(null);

      // Upload avatar if provided
      let avatarUrl = "";
      if (data.avatar) {
        const { publicUrl } = await data.avatar.upload("avatars", {
          fileName: `${data.userId}-${Date.now()}`,
        });
        avatarUrl = publicUrl;
      }

      // First create the address record
      const { data: addressData, error: addressError } = await supabase
        .from("addresses")
        .insert(convertAddressToPostGIS(data.address))
        .select()
        .single();

      if (addressError || !addressData) {
        throw new Error("Failed to create address. Please try again.");
      }

      // Create/update profile
      const { error: profileError } = await supabase
        .from("user_profiles")
        .upsert(
          {
            id: data.userId,
            full_name: data.name,
            gender: data.gender,
            date_of_birth: data.dateOfBirth.toISOString(),
            location_id: addressData.id,
            avatar_url: avatarUrl || null,
          },
          {
            onConflict: "id",
          },
        );

      if (profileError) {
        throw new Error("Failed to create profile. Please try again.");
      }

      // Delete existing interests
      const { error: deleteError } = await supabase
        .from("user_profile_interests")
        .delete()
        .eq("user_profile_id", data.userId);

      if (deleteError) {
        throw new Error("Failed to update interests. Please try again.");
      }

      // Insert new interests if any are provided
      if (data.interests && data.interests.length > 0) {
        const interestRecords = data.interests.map((interestId) => ({
          user_profile_id: data.userId,
          interest_id: interestId,
        }));

        const { error: interestsError } = await supabase
          .from("user_profile_interests")
          .insert(interestRecords);
        if (interestsError) {
          throw new Error("Failed to add interests. Please try again.");
        }
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while creating profile";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { createProfile, isLoading, error };
}
