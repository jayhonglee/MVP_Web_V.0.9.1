import { UserProfile } from "./types";

// Helper function to transform database row to UserProfile type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  delete transformedData.location_id;

  return transformedData as UserProfile;
}