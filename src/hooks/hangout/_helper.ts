import { transformUserProfileData } from "../profile/_helper";
import { Hangout } from "./types";

// Helper function to get the common select query for hangouts
export function getHangoutSelectQuery(): string {
  return `
    *,
    addresses!hangouts_location_id_fkey(*),
    host_profiles:user_profiles!hangouts_host_id_fkey(
      *,
      user_profile_interests(interest_id),
      addresses!user_profiles_location_id_fkey(*)
    ),
    hangout_participants(
      *,
      user_profiles:user_profiles!hangout_participants_user_profile_id_fkey(
        *,
        user_profile_interests(interest_id),
        addresses!user_profiles_location_id_fkey(*)
      )
    )
  `;
}
  
// Helper function to transform database row to Hangout type
export function transformHangoutData(data: any): Hangout {
  return {
    id: data.id,
    host: transformUserProfileData(data.host_profiles),
    type: data.type,
    title: data.title,
    description: data.description,
    cover_image_url: data.cover_image_url,
    scheduled_when: new Date(data.scheduled_when),
    address: data.addresses,
    navigation_instruction: data.navigation_instruction,
    group_size: data.group_size,
    participants:
      data.hangout_participants?.map((participant: any) => ({
        user: transformUserProfileData(participant.user_profiles),
        status: participant.status,
      })) || [],
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}