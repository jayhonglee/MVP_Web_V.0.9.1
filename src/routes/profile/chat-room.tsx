import { useEffect, useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useGetHangout } from "@/hooks/hangout/useGetHangout";
import getChatRoomIcon from "../../utils/getChatRoomIcon";
import fallbackHangoutBackground from "@/assets/fallback-hangout-background";

function ChatRoom() {
  const navigate = useNavigate();
  const { hangoutId } = useSearch({ from: "/profile/chat-room" });
  const { hangout, isLoading, error } = useGetHangout(hangoutId);
  const [message, setMessage] = useState("");
  const [isMessageEmpty, setIsMessageEmpty] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.width = "0";

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.width = "100%";
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // console.log("Chat room for group chat ID:", hangoutId);
  // console.log("Hangout:", hangout);
  // console.log("image: ", hangout?.dropInImage);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-[60] bg-white flex flex-col">
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
            src={
              hangout?.dropin?.dropInImage
                ? URL.createObjectURL(
                    new Blob(
                      [new Uint8Array(hangout?.dropin?.dropInImage.data)],
                      { type: "image/jpeg" }
                    )
                  )
                : fallbackHangoutBackground
            }
            alt={hangout?.dropin?.title}
            className="rounded-full object-cover w-[44px] h-[44px]"
            onError={(e) => {
              e.currentTarget.src = fallbackHangoutBackground;
            }}
          />
          <div className="flex flex-col justify-start items-start">
            <div className="text-[16px] font-[600] break-words leading-[13px]">
              {hangout?.dropin?.title}
            </div>
            <div className="text-[12px] text-gray-500 no-wrap text-ellipsis leading-[11px] break-words color-[rgb(115,115,115)] mt-[8px]">
              {hangout?.dropin?.type.charAt(0).toUpperCase() +
                hangout?.dropin?.type.slice(1)}
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex justify-end items-center gap-[12px] h-[44px]">
          {getChatRoomIcon("info")}
        </div>
      </div>

      {/* Chat room messages */}
      <div className="w-full flex-1">Chat room messages</div>

      {/* Chat room input */}
      <div className="w-full h-[78px] flex flex-col justify-center items-center p-[16px]">
        <div className="w-full h-[46px] border-[1px] border-gray-200 rounded-[23px] flex justify-center items-center px-[20px]">
          <input
            type="text"
            className="w-full h-[20px] outline-none text-[15px] font-[400] leading-[18px] break-words flex items-center"
            placeholder="Message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsMessageEmpty(e.target.value.length === 0);
            }}
          />
          <span className="w-[24px] h-[24px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={`w-full h-full ${
                isMessageEmpty
                  ? "fill-gray-400 cursor-default"
                  : "fill-[rgb(244,54,48)] cursor-pointer"
              }`}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 215c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71L280 392c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-214.1-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 103c9.4-9.4 24.6-9.4 33.9 0L385 215z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/profile/chat-room")({
  component: ChatRoom,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      hangoutId: (search.hangoutId as string) || undefined,
    };
  },
});
