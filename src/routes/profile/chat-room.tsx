import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import chatRoom from "../../mock/chatRoom.json";
import { useNavigate } from "@tanstack/react-router";
import getChatRoomIcon from "../../utils/getChatRoomIcon";

function ChatRoom() {
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-[60] bg-white">
      {/* Chat room header */}
      <div className="w-screen h-[77px] p-[16px] border-b-[1px] flex justify-between items-center">
        {/* Left side */}
        <div className="flex justify-start items-center gap-[12px] h-[44px]">
          <span
            className="cursor-pointer mobile:mr-[12px]"
            onClick={() => {
              navigate({
                to: "/profile/group-chat",
              });
            }}
          >
            {getChatRoomIcon("back")}
          </span>
          <img
            src={chatRoom.chatImage}
            alt={chatRoom.name}
            width={44}
            height={44}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col justify-start items-start">
            <div className="text-[16px] font-[600] break-words leading-[13px]">
              {chatRoom.name}
            </div>
            <div className="text-[12px] text-gray-500 no-wrap text-ellipsis leading-[11px] break-words color-[rgb(115,115,115)] mt-[8px]">
              {chatRoom.type.charAt(0).toUpperCase() + chatRoom.type.slice(1)}
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex justify-end items-center gap-[12px] h-[44px]">
          {getChatRoomIcon("info")}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/profile/chat-room")({
  component: ChatRoom,
});
