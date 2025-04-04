import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import type { UserProfile } from "./types";
import { transformUserProfileData } from "./_helper";

export type UserProfileError = {
  message: string;
  code?: string;
};

export const fetchUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  const { data, error: profileError } = await supabase
    .from("user_profiles")
    .select(
      `
      *,
      user_profile_interests(interest_id),
      addresses!user_profiles_location_id_fkey(*)
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
