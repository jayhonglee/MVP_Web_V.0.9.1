import { InterestId } from "@/hooks/interests/types";
import { FileHolder } from "@/lib/storage";
import { Address } from "@/hooks/map/types";
import { UserProfile } from "@/hooks/profile/types";

export interface HangoutParticipant {
  user: UserProfile;
  status: "pending" | "accepted";
}

export interface Hangout {
  id: string;
  host: UserProfile;
  type: InterestId;
  title: string;
  description: string;
  cover_image_url: string | null;
  scheduled_when: Date;
  address: Address;
  navigation_instruction: string | null;
  group_size: number;
  participants: HangoutParticipant[];
  created_at: Date;
  updated_at: Date;
}

export interface CreateHangoutDto {
  type: InterestId;
  title: string;
  description: string;
  coverImage?: FileHolder;
  scheduled_when: Date;
  address: Address;
  navigationInstruction?: string;
  groupSize: number;
}

export interface UpdateHangoutDto extends Partial<CreateHangoutDto> {
  id: string;
}
