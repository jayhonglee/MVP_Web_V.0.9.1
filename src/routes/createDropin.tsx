import { useState } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
// import { useAuth } from "../context/auth/useAuth";
import CreateDropinHeader from "@/components/CreateDropinHeader";

function RouteComponent() {
  const [showPostBtn, setShowPostBtn] = useState(false);

  return (
    <div className="bg-[#f4f4f4] w-[100vw]">
      <div className="bg-[#fff] max-w-[900px] min-h-[100vh] mx-auto relative">
        {/* Header */}
        <CreateDropinHeader showPostBtn={showPostBtn} />

        {/* Divider */}
        <hr />

        {/* Editor */}
        <div className="w-full px-[14px] min-[600px]:px-[28px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/createDropin")({
  component: RouteComponent,
  validateSearch: () => ({}),
});

// type : InterestId ("food-drinks" | "sports" | "books-study" | "travel-outdoor" | "art-crafting" | "local-chat")
// title : string
// description : string
// coverImage : FileHolder
// scheduled_when : Date
// address : Address
// navigationInstruction : string
// groupSize : number
