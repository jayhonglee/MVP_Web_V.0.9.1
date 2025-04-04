import { InterestId } from "@/hooks/interests/types";
import { FileHolder } from "@/lib/storage";
import { Address } from "@/hooks/map/types";

export interface UserProfile {
  id: string;
  full_name: string;
  gender: string;
  date_of_birth: string;
  address: Address;
  avatar_url: string | null;
  cover_photo_url: string | null;
  introduction: string | null;
  interests: InterestId[];
}

export interface UserProfileDto {
  userId: string;
  name: string;
  gender: string;
  dateOfBirth: Date;
  avatar?: FileHolder;
  address: Address;
  interests: InterestId[];
}

export type UpdateUserProfileDto = Partial<Omit<UserProfileDto, "userId">> & {
  id: string; // Required id field for identifying which profile to update
  coverPhoto?: FileHolder;
  introduction?: string;
};
