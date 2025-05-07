import { useState } from "react";

const types = [
  {
    id: "food-drinks",
    name: "Food & Drinks",
    description: "All things food and beverage related",
    emoji: "🍽️",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Any sports and athletic activities",
    emoji: "⚽",
  },
  {
    id: "books-study",
    name: "Books & Study",
    description: "Learning and intellectual discussions",
    emoji: "📚",
  },
  {
    id: "travel-outdoor",
    name: "Travel & Outdoor",
    description: "Adventures and outdoor experiences",
    emoji: "🏕️",
  },
  {
    id: "art-crafting",
    name: "Art & Crafting",
    description: "Creative expression and making",
    emoji: "🎨",
  },
  {
    id: "local-chat",
    name: "Local Chat",
    description: "Community and local discussions",
    emoji: "💬",
  },
];

export default function TypePage({
  setCurrentPage,
  setProgress,
}: {
  setCurrentPage: (currentPage: number) => void;
  setProgress: (progress: number) => void;
}) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <>
      <div className="w-full h-[26px] bg-transparent" />

      <p className="w-full text-[20px] mobile:text-[28px] font-[500] leading-[28px] mobile:leading-[40px] tracking-[-0.25px] text-[rgb(56,53,53)]">
        What type of Drop-In would you like?
      </p>

      <div className="w-full h-[8px] mobile:h-[16px] bg-transparent" />

      <p className="w-full text-[14px] mobile:text-[18px] font-[400] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(153,150,150)]">
        Help people find by choosing a type
      </p>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full flex flex-col gap-[16px]">
        {types.map((type) => (
          <div
            key={type.id}
            className={`w-full h-[80px] rounded-[12px] border-[1px] ${
              selectedType === type.id
                ? "border-[#F43630] border-[2px]"
                : "border-[#b9b6b6]"
            } flex items-center justify-start gap-[14px] cursor-pointer`}
            onClick={() => setSelectedType(type.id)}
          >
            <span className="ml-[28px]">{type.emoji}</span>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[16px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)] line-clamp-1">
                {type.name}
              </p>
              <p className="text-[14px] font-[400] leading-[20px] tracking-[-0.25px] text-[rgb(153,150,150)] line-clamp-1">
                {type.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full">
        {/* Next Button */}
        <button
          className={`w-full p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] ${
            selectedType
              ? "bg-[#F43630] text-white cursor-pointer"
              : "bg-[#DBDBDB] text-[#A2A2A2] cursor-default"
          }`}
          disabled={!selectedType}
          onClick={() => {
            setCurrentPage(2);
            setProgress(50);
          }}
        >
          Next
        </button>
      </div>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />
    </>
  );
}
