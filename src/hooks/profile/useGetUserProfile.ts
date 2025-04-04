import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import type { UserProfile } from "./types";

export type UserProfileError = {
  message: string;
  code?: string;
};

// Helper function to transform database row to UserProfile type
export function transformUserProfileData(data: any): UserProfile {
  if (!data) {
    throw new Error("Transforming user profile data failed: No data provided");
  }

  // Transform the nested data structure
  const transformedData = {
    ...data,
    interests:
      data.user_profile_interests?.map(
        (i: { interest_id: string }) => i.interest_id,
      ) || [],
    address: data.addresses || {},
  };

  // Remove the nested properties that were flattened
  delete transformedData.user_profile_interests;
  delete transformedData.addresses;
  delete transformedData.address_id;

  return transformedData as UserProfile;
}

export const fetchUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  const { data, error: profileError } = await supabase
    .from("user_profiles")
    .select(
      `
      *,
      user_profile_interests(interest_id),
      addresses!user_profiles_address_id_fkey(*)
    `,
    )
    .eq("id", userId)
    .single();

  if (!data || profileError) {
    throw new Error("Failed to fetch user profile");
  }

  return transformUserProfileData(data);
};

const fetchCurrentUserProfile = async (): Promise<UserProfile | null> => {
  // First get and validate session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) throw sessionError;
  return fetchUserProfile(session.user.id);
};

export function useGetUserProfile(
  userId: string,
  queryOptions?: Partial<UseQueryOptions<UserProfile | null, UserProfileError>>,
): UseQueryResult<UserProfile | null, UserProfileError> {
  return useQuery<UserProfile | null, UserProfileError>({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    ...queryOptions,
  });
}

export function useGetCurrentUserProfile(
  queryOptions?: Partial<UseQueryOptions<UserProfile | null, UserProfileError>>,
): UseQueryResult<UserProfile | null, UserProfileError> {
  return useQuery<UserProfile | null, UserProfileError>({
    queryKey: ["userProfile", "current"],
    queryFn: fetchCurrentUserProfile,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...queryOptions,
  });
}
