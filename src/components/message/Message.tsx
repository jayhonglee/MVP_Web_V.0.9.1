import "./Message.css";
import { useEffect, useState } from "react";
import fallbackHangoutBackground from "@/assets/fallback-hangout-background";

interface MessageData {
  sender: string;
  text: string;
  createdAt: number | string;
  _id?: string;
}

interface MessageProps {
  message: MessageData;
  own: boolean;
  allMembersAvatarURLs: Record<string, string | null>;
}

export default function Message({
  message,
  own,
  allMembersAvatarURLs,
}: MessageProps) {
  const [avatarURL, setAvatarURL] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAvatarURL(allMembersAvatarURLs?.[message.sender] || undefined);
  }, [message, allMembersAvatarURLs, own]);

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
            src={avatarURL ? `${avatarURL}` : fallbackHangoutBackground}
            onError={(e) => {
              e.currentTarget.src = fallbackHangoutBackground;
            }}
            alt=""
          />
        )}
        <p className="messageText relative">
          {message.text}
          <span className={`absolute bottom-0 ${own ? "left-0" : "right-0"}`}>
            <div
              className={`messageBottom ${own ? "translate-x-[calc(-100%-6px)]" : "translate-x-[calc(100%+6px)]"}`}
            >
              {formatTime(message.createdAt)}
            </div>
          </span>
        </p>
      </div>
    </div>
  );
}
