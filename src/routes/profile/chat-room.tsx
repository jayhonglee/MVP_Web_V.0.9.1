import { useEffect, useState, useRef } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useGetHangout } from "@/hooks/hangout/useGetHangout";
import { useCreateMessage } from "@/hooks/messages/useCreateMessage";
import { useGetMessages } from "@/hooks/messages/useGetMessages";
import { useAuth } from "@/context/auth/useAuth";
import { io, Socket } from "socket.io-client";
import Message from "@/components/message/Message";
import getChatRoomIcon from "../../utils/getChatRoomIcon";
import fallbackHangoutBackground from "@/assets/fallback-hangout-background";

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [isMessageEmpty, setIsMessageEmpty] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const socket = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentEditableRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { hangoutId, groupChatId } = useSearch({ from: "/profile/chat-room" });
  const { hangout, isLoading, error } = useGetHangout(hangoutId);
  const { user } = useAuth();
  const {
    messages,
    isLoading: isMessagesLoading,
    error: isMessagesError,
  } = useGetMessages(groupChatId);
  const {
    mutate: createMessage,
    isPending: isCreateMessagePending,
    error: createMessageError,
  } = useCreateMessage();
  const [newMessages, setNewMessages] = useState<
    {
      sender: string;
      text: string;
      createdAt: number;
    }[]
  >([]);
  const [arrivalMessage, setArrivalMessage] = useState<{
    sender: string;
    text: string;
    createdAt: number;
  } | null>(null);

  const handleSendMessage = () => {
    if (message.trim() && !isCreateMessagePending) {
      createMessage(
        {
          groupChat: groupChatId,
          text: message.trim(),
        },
        {
          onSuccess: () => {
            setMessage("");
            setIsMessageEmpty(true);

            // Emit socket event for real-time
            socket.current?.emit("sendMessage", {
              senderId: user?.user?._id,
              receiverId: groupChatId,
              text: message,
            });

            setNewMessages((prev) => [
              ...prev,
              {
                sender: user?.user?._id || "", // Provide empty string fallback
                text: message.trim(),
                createdAt: Date.now(),
              },
            ]);

            // Clear input
            if (contentEditableRef.current) {
              contentEditableRef.current.innerText = "";
            }
          },
          onError: () => {
            console.error("Failed to send message:", createMessageError);
          },
        }
      );
    }
  };

  // Mock avatar URLs
  // const mockAvatarURLs = {
  //   user1:
  //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  //   user2:
  //     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  //   currentUser:
  //     "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  // };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.width = "0";

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.width = "100%";
    };
  }, []);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SOCKET_ADDRESS);
    socket.current.on(
      "getMessage",
      (data: { senderId: string; text: string }) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      }
    );

    return () => {
      // Disconnect the socket
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    setNewMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (
      arrivalMessage &&
      hangout?.dropin?.members?.includes(arrivalMessage.sender)
    )
      setNewMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, hangout?.dropin?.members]);

  useEffect(() => {
    if (!user?.user?._id) return;

    socket.current?.emit("addUser", user?.user?._id);
    socket.current?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessages]);

  if (isLoading || isMessagesLoading)
    return (
      <div className="w-[100vw] h-[100vh] absolute top-0 left-0 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F43630]" />
      </div>
    );
  if (error || createMessageError || isMessagesError)
    return <div>Error: {error?.message || createMessageError?.message}</div>;

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
      <div className="w-full flex-1 overflow-y-auto p-4">
        {newMessages?.map((message: any) => (
          <div ref={scrollRef}>
            <Message
              key={message._id}
              message={message}
              own={message.sender === user?.user?._id}
              allMembersAvatarURLs={hangout?.dropin?.members?.map(
                (member: any) => member.avatarURL
              )}
            />
          </div>
        ))}
      </div>

      {/* Chat room input */}
      <div className="w-full h-[78px] flex flex-col justify-center items-center p-[16px]">
        <div className="w-full h-[46px] border-[1px] border-gray-200 rounded-[23px] flex justify-center items-center px-[20px]">
          <input
            contentEditable
            ref={contentEditableRef}
            type="text"
            className="w-full h-[20px] outline-none text-[15px] font-[400] leading-[18px] break-words flex items-center"
            placeholder="Message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsMessageEmpty(e.target.value.length === 0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <span className="w-[24px] h-[24px]" onClick={handleSendMessage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={`w-full h-full ${
                isMessageEmpty || isCreateMessagePending
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
      groupChatId: (search.groupChatId as string) || undefined,
    };
  },
});
