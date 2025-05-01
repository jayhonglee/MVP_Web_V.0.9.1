import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/group-chat")({
  component: GroupChat,
});

function GroupChat() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-4">Group Chat</h1>
      {/* Add your group chat content here */}
    </div>
  );
}
