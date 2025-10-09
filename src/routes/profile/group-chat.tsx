import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import mockChatList from "../../mock/chatList.json";
import { useGetGroupChats } from "@/hooks/groupChat/useGetGroupChats";
import fallbackHangoutBackground from "@/assets/fallback-hangout-background";

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
  const navigate = useNavigate();
  const { groupChats, isLoading, error } = useGetGroupChats();

  console.log(groupChats);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center pt-[30vh]">
        <div>Loading group chats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center pt-[30vh]">
        <div>Error loading group chats: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full h-[10px] bg-transparent" />
      {(!groupChats || groupChats.length === 0) && (
        <div className="w-full flex flex-col justify-center items-center pt-[30vh]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={40}
            height={40}
            className="text-[#b9b6b6] mb-[12px]"
            fill="currentColor"
          >
            <path d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
          </svg>
          <p className="text-[16px] mobile:text-[20px] font-[500] leading-[24px] mobile:leading-[28px] tracking-[-0.25px] text-[rgb(185,182,182)]">
            Start chatting with your friends!
          </p>
        </div>
      )}
      {groupChats?.map((chat: any) => {
        return (
          <div
            key={chat.id}
            className="w-full flex justify-start items-center px-[8px] py-[8px] gap-[12px] hover:bg-[#F5F5F5] cursor-pointer"
            onClick={() => {
              navigate({ to: "/profile/chat-room" });
            }}
          >
            <img
              src={chat.dropin.dropInImage || fallbackHangoutBackground}
              alt={chat.dropin.title}
              className="rounded-full object-cover w-[56px] h-[56px]"
              onError={(e) => {
                e.currentTarget.src = fallbackHangoutBackground;
              }}
            />
            <div className="flex flex-col justify-start items-start gap-[4px]">
              <h1 className="text-[14px] leading-[18px] font-[400] text-black line-clamp-1">
                {chat.dropin.title}
              </h1>
              <p className="text-[14px] leading-[18px] font-[400] text-[#737373] line-clamp-1">
                {chat.dropin.description} · {timeAgo(chat.dropin.createdAt)}
              </p>
            </div>
          </div>
        );
      })}
      {/* <div className="absolute top-0 left-0 z-[60] w-[100vw] h-[100vh] overflow-hidden bg-red-500" /> */}
    </div>
  );
}

export const Route = createFileRoute("/profile/group-chat")({
  component: GroupChat,
});
