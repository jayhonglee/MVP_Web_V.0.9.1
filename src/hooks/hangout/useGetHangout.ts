import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import { Hangout } from "./types";
import { transformUserProfileData } from "@/hooks/profile/useGetUserProfile";

// Helper function to get the common select query for hangouts
export function getHangoutSelectQuery(): string {
  return `
    *,
    addresses!hangouts_location_id_fkey(*),
    host_profiles:user_profiles!hangouts_host_id_fkey(
      *,
      user_profile_categories(category_id),
      addresses!user_profiles_address_id_fkey(*)
    ),
    hangout_participants(
      *,
      user_profiles:user_profiles!hangout_participants_user_profile_id_fkey(
        *,
        user_profile_categories(category_id),
        addresses!user_profiles_address_id_fkey(*)
      )
    )
  `;
}

// Helper function to transform database row to Hangout type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformHangoutData(data: any): Hangout {
  return {
    id: data.id,
    host: transformUserProfileData(data.host_profiles),
    type: data.type,
    title: data.title,
    description: data.description,
    cover_image_url: data.cover_image_url,
    scheduled_when: new Date(data.scheduled_when),
    location: data.addresses,
    navigation_instruction: data.navigation_instruction,
    group_size: data.group_size,
    participants:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.hangout_participants?.map((participant: any) => ({
        user: transformUserProfileData(participant.user_profiles),
        status: participant.status,
      })) || [],
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

export type HangoutError = {
  message: string;
  code?: string;
};

export const fetchHangout = async (
  hangoutId: string,
): Promise<Hangout | null> => {
  const { data, error } = await supabase
    .from("hangouts")
    .select(getHangoutSelectQuery())
    .eq("id", hangoutId)
    .single();

  if (!data || error) {
    throw new Error("Failed to fetch hangout");
  }

  // Transform the data to match our Hangout type
  const hangout: Hangout = transformHangoutData(data);

  return hangout;
};

export default function useGetHangout(
  hangoutId: string,
  queryOptions?: Partial<UseQueryOptions<Hangout | null, HangoutError>>,
): UseQueryResult<Hangout | null, HangoutError> {
  return useQuery<Hangout | null, HangoutError>({
    queryKey: ["hangout", hangoutId],
    queryFn: () => fetchHangout(hangoutId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    ...queryOptions,
  });
}
