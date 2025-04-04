import { Interest } from "@/constants/interests";
import { FileHolder } from "@/lib/storage";
import { Address } from "@/hooks/map/address";

export interface UserProfile {
  id: string;
  full_name: string;
  gender: string;
  date_of_birth: string;
  address: Address;
  avatar_url: string | null;
  cover_photo_url: string | null;
  introduction: string | null;
  interests: Interest["id"][];
}

export interface UserProfileDto {
  userId: string;
  name: string;
  gender: string;
  dateOfBirth: Date;
  avatar?: FileHolder;
  address: Address;
  interests: Interest["id"][];
}

export type UpdateUserProfileDto = Partial<Omit<UserProfileDto, "userId">> & {
  id: string; // Required id field for identifying which profile to update
  coverPhoto?: FileHolder;
  introduction?: string;
};
