import { DropinData } from "@/routes/createDropin";

const types = [
  {
    id: "art-crafting",
    name: "Art & Crafting",
    description: "Creative expression and making",
    emoji: "🎨",
  },
  {
    id: "books-study",
    name: "Books & Study",
    description: "Study and share knowledge with people",
    emoji: "📚",
  },
  {
    id: "club-activities",
    name: "Club Activities",
    description: "Join and enjoy club activities with people",
    emoji: "🎤",
  },
  {
    id: "food-drinks",
    name: "Food & Drinks",
    description: "Enjoy food and drinks with people",
    emoji: "🍽️",
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Play games and have fun with people",
    emoji: "🎮",
  },
  {
    id: "local-chat",
    name: "Local Chat",
    description: "Community and local discussions",
    emoji: "💬",
  },
  {
    id: "party",
    name: "Party",
    description: "Go crazy and have a good time",
    emoji: "🎉",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Do sports and athletic activities",
    emoji: "⚽",
  },
  {
    id: "travel-outdoor",
    name: "Travel & Outdoor",
    description: "Adventures and outdoor experiences",
    emoji: "🏕️",
  },
];

export default function TypePage({
  dropinData,
  setDropinData,
  currentPage,
  setCurrentPage,
  progress,
  setProgress,
}: {
  dropinData: DropinData;
  setDropinData: (dropinData: DropinData) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
}) {
  return (
    <>
      <div className="w-full h-[26px] bg-transparent" />

      <p className="w-full text-[20px] mobile:text-[28px] font-[500] leading-[28px] mobile:leading-[40px] tracking-[-0.25px] text-[rgb(56,53,53)]">
        What type of Drop-In would you like?
      </p>

      <div className="w-full h-[8px] mobile:h-[16px] bg-transparent" />

      <p className="w-full text-[14px] mobile:text-[18px] font-[400] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(153,150,150)]">
        Help people find this Drop-In by choosing a type.
      </p>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full flex flex-col gap-[16px]">
        {types.map((type) => (
          <div
            key={type.id}
            className={`w-full h-[80px] rounded-[12px] border-[1px] ${
              dropinData.type === type.name
                ? "border-[#F43630] border-[2px]"
                : "border-[#b9b6b6]"
            } flex items-center justify-start gap-[14px] cursor-pointer`}
            onClick={() => setDropinData({ ...dropinData, type: type.name })}
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
            dropinData.type
              ? "bg-[#F43630] text-white cursor-pointer"
              : "bg-[#DBDBDB] text-[#A2A2A2] cursor-default"
          }`}
          disabled={!dropinData.type}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            setProgress(progress + 15);
          }}
        >
          Next
        </button>
      </div>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />
    </>
  );
}
