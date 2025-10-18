import "./Message.css";
import { GroupChatUser } from "@/hooks/groupChat/useGetGroupChatUsersData";

interface MessageData {
  sender: string;
  text: string;
  createdAt: number | string;
  _id?: string;
}

interface MessageProps {
  message: MessageData;
  own: boolean;
  allMembersData: GroupChatUser[];
}

export default function Message({
  message,
  own,
  allMembersData,
}: MessageProps) {
  // Format time as HH:MM
  const formatTime = (timestamp: number | string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {!own && (
          <img
            className="messageImg"
            src={
              allMembersData.find((user) => user._id === message.sender)
                ?.avatar || "/avatar-default.svg"
            }
            onError={(e) => {
              e.currentTarget.src = "/avatar-default.svg";
            }}
            alt=""
          />
        )}
        <div className="relative">
          <p className="text-[12px] text-[#6B7280] pl-[12px] absolute top-0 left-0">
            {!own &&
              allMembersData.find((user) => user._id === message.sender)
                ?.firstName}
          </p>
          <p className={`messageText relative ${!own && "mt-[18px]"}`}>
            {message.text}
            <span
              className={`absolute bottom-0 ${own ? "left-0" : "right-0"} inline-block`}
            >
              <span
                className={`messageBottom ${own ? "translate-x-[calc(-100%-6px)]" : "translate-x-[calc(100%+6px)]"} inline-block`}
              >
                {formatTime(message.createdAt)}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
