import { createFileRoute } from "@tanstack/react-router";
import mockChatList from "../../mock/chatList.json";

function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return `${Math.floor(diff / 604800)}w`;
}

function GroupChat() {
  return (
    <div className="w-full">
      <div className="w-full h-[10px] bg-transparent" />
      {mockChatList.map((chat) => {
        return (
          <div
            key={chat.id}
            className="w-full flex justify-start items-center px-[8px] py-[8px] gap-[12px] hover:bg-[#F5F5F5] cursor-pointer"
          >
            <img
              src={chat.chatImage}
              alt={chat.name}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col justify-start items-start gap-[4px]">
              <h1 className="text-[14px] leading-[18px] font-[400] text-black line-clamp-1">
                {chat.name}
              </h1>
              <p className="text-[14px] leading-[18px] font-[400] text-[#737373] line-clamp-1">
                {chat.latestMessage} · {timeAgo(chat.latestMessageTime)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const Route = createFileRoute("/profile/group-chat")({
  component: GroupChat,
});
