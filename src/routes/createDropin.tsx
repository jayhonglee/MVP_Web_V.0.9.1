import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CreateDropinHeader from "@/components/CreateDropinHeader";
import DescriptionEditorPage from "@/components/createDropinPages/DescriptionEditorPage";
import TypePage from "@/components/createDropinPages/TypePage";
import NamePage from "@/components/createDropinPages/NamePage";
import CoverImagePage from "@/components/createDropinPages/CoverImagePage";
import DatePage from "@/components/createDropinPages/DatePage";
import AddressPage from "@/components/createDropinPages/AddressPage";
import NavigationPage from "@/components/createDropinPages/NavigationPage";
// import { useAuth } from "../context/auth/useAuth";

function RouteComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPostBtn, setShowPostBtn] = useState(false);
  const [progress, setProgress] = useState(15);

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <TypePage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
          />
        );

      case 2:
        return (
          <NamePage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
          />
        );

      case 3:
        return (
          <DatePage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
          />
        );

      case 4:
        return (
          <AddressPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
          />
        );

      case 5:
        return (
          <NavigationPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
          />
        );

      case 6:
        return (
          <CoverImagePage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
            setShowPostBtn={setShowPostBtn}
          />
        );

      case 7:
        return (
          <DescriptionEditorPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
            setShowPostBtn={setShowPostBtn}
          />
        );
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
