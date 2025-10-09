import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { DropinData } from "@/routes/createDropin";
import { useCreateHangout } from "@/hooks/hangout/useCreateHangout";
import { useCreateGroupChat } from "@/hooks/groupChat/useCreateGroupchat";

interface HeaderWithBackBtnProps {
  dropinData: DropinData;
  progress?: number;
  showPostBtn?: boolean;
}

const HeaderWithBackBtn: React.FC<HeaderWithBackBtnProps> = ({
  dropinData,
  progress = 0,
  showPostBtn = false,
}) => {
  const navigate = useNavigate();
  const { mutate: createHangout, isPending } = useCreateHangout();
  const { mutate: createGroupChat, isPending: isGroupChatPending } =
    useCreateGroupChat();

  const handlePost = () => {
    // Check if description is not empty (not just default content)
    if (dropinData.description && dropinData.description.trim() !== "") {
      createHangout(dropinData, {
        onSuccess: (createdDropin) => {
          // After hangout is created successfully, create group chat with the returned dropin ID
          createGroupChat(
            { dropinId: createdDropin.dropin._id },
            {
              onSuccess: () => {
                navigate({ to: "/profile/group-chat" });
              },
              onError: (error) => {
                // If group chat already exists, that's okay - just navigate to group chat page
                if (error.message.includes("already exists")) {
                  console.log(
                    "Group chat already exists, navigating to group chat page"
                  );
                  navigate({ to: "/profile/group-chat" });
                } else {
                  console.error("Failed to create group chat:", error);
                }
              },
            }
          );
        },
        onError: (error) => {
          console.error("Failed to create hangout:", error);
          // You can add error handling here (show toast, etc.)
        },
      });
    }
  };

  const isPostDisabled =
    !dropinData.description ||
    dropinData.description.trim() === "" ||
    isPending ||
    isGroupChatPending;

  return (
    <div className="relative w-full">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 z-[10]">
        <div
          className="h-full bg-[#F43630] transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div
        className={`bg-[#fefefe] w-full h-[56px] min-[600px]:h-[4rem] px-[14px] py-[17px] flex justify-between items-center sticky top-0 min-[600px]:px-[28px] border-t-4`}
      >
        <Link to="/">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="text-[#383535]"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </Link>
        <div
          className={`flex items-center ${showPostBtn ? "block" : "hidden"}`}
        >
          <button
            onClick={handlePost}
            disabled={isPostDisabled}
            className={`rounded-full px-[20px] py-[5px] ms-[32px] uppercase transition-colors ${
              isPostDisabled
                ? "bg-[#A2A2A2] cursor-not-allowed"
                : "bg-[#F43630] cursor-pointer hover:bg-[#E02E28]"
            }`}
          >
            <p className="text-sm text-white font-medium flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-3 h-3 mr-2"
                fill="currentColor"
              >
                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
              </svg>
              {isPending ? "Posting..." : "Post"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderWithBackBtn;
