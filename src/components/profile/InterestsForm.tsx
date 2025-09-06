import { useState } from "react";
import { User } from "@/context/auth/auth.types";

interface InterestsFormProps {
  user: User["user"];
  onSubmit: (updatedUser: Partial<User["user"]>) => Promise<void>;
  isLoading: boolean;
}

// Predefined interest options with labels
const INTEREST_OPTIONS: { id: string; label: string }[] = [
  { id: "culture-arts", label: "Culture·Arts" },
  { id: "activities", label: "Activities" },
  { id: "food-drink", label: "Food·Drink" },
  { id: "hobbies", label: "Hobbies" },
  { id: "travel-companion", label: "Travel·Companion" },
  { id: "self-development", label: "Self-Development" },
  { id: "local-neighborhood", label: "Local·Neighborhood" },
];

export default function InterestsForm({
  user,
  onSubmit,
  isLoading,
}: InterestsFormProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user.interests || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ interests: selectedInterests });
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestId)) {
        // Remove interest
        return prev.filter((id) => id !== interestId);
      } else {
        // Add interest
        return [...prev, interestId];
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block py-[16px] text-[16px] font-[700] leading-[20px] tracking-[-0.25px] text-[rgb(56,53,53)] break-words">
          Select Your Interests
        </label>
        <p className="text-[14px] text-[rgb(115,115,115)] mb-[16px]">
          Choose the activities and topics that interest you most.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {INTEREST_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={`relative cursor-pointer rounded-[12px] border transition-all duration-200 ${
                selectedInterests.includes(option.id)
                  ? "border-[#f43630] bg-[#f43630]/5"
                  : "border-[rgb(219,223,228)] hover:border-[#f43630]/50"
              }`}
              onClick={() => toggleInterest(option.id)}
            >
              <div className="p-[16px] flex items-center justify-between">
                <span className="text-[16px] font-[500] leading-[20px] tracking-[-0.25px] text-[rgb(56,53,53)]">
                  {option.label}
                </span>

                {/* Checkbox indicator */}
                <div
                  className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center transition-all duration-200 ${
                    selectedInterests.includes(option.id)
                      ? "border-[#f43630] bg-[#f43630]"
                      : "border-[rgb(219,223,228)] bg-white"
                  }`}
                >
                  {selectedInterests.includes(option.id) && (
                    <svg
                      className="w-[12px] h-[12px] text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-[253px] h-[44px] px-4 py-2 bg-[#f43630] rounded-[8px] hover:bg-[#d63029] disabled:opacity-50 text-[rgb(255,255,255)] font-bold leading-[20px] tracking-[-0.25px]"
        >
          {isLoading ? "Saving..." : "Save Interests"}
        </button>
      </div>
    </form>
  );
}
