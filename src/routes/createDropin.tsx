import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CreateDropinHeader from "@/components/CreateDropinHeader";
import DescriptionEditorPage from "@/components/createDropinPages/DescriptionEditorPage";
import TypePage from "@/components/createDropinPages/TypePage";
// import { useAuth } from "../context/auth/useAuth";

function RouteComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPostBtn] = useState(false);
  const [progress, setProgress] = useState(25);

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <TypePage setCurrentPage={setCurrentPage} setProgress={setProgress} />
        );
      case 2:
        return <DescriptionEditorPage />;
    }
  };

  return (
    <div className="bg-[#f4f4f4] w-[100vw]">
      <div className="bg-[#fff] max-w-[900px] min-h-[100vh] mx-auto relative">
        {/* Header */}
        <CreateDropinHeader showPostBtn={showPostBtn} progress={progress} />

        {/* Divider */}
        <hr />

        {/* Editor */}
        <div className="w-full px-[14px] min-[600px]:px-[28px]">
          {renderPage()}
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
