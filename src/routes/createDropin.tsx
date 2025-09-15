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
import ProtectedRoute from "../context/auth/ProtectedRoute";

export interface DropinData {
  type: string;
  title: string;
  date: Date | null;
  location: string;
  address: string;
  navigation: string;
  dropInImage: File | null;
  description: string;
}

function RouteComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPostBtn, setShowPostBtn] = useState(false);
  const [progress, setProgress] = useState(15);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [dropinData, setDropinData] = useState<DropinData>({
    type: "",
    title: "",
    date: null,
    location: "",
    address: "",
    navigation: "",
    dropInImage: null,
    description: "",
  });

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <TypePage
            dropinData={dropinData}
            setDropinData={setDropinData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
          />
        );

      case 2:
        return (
          <NamePage
            dropinData={dropinData}
            setDropinData={setDropinData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
          />
        );

      case 3:
        return (
          <DatePage
            dropinData={dropinData}
            setDropinData={setDropinData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
          />
        );

      case 4:
        return (
          <AddressPage
            streetAddress={streetAddress}
            setStreetAddress={setStreetAddress}
            city={city}
            setCity={setCity}
            province={province}
            setProvince={setProvince}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            country={country}
            setCountry={setCountry}
            dropinData={dropinData}
            setDropinData={setDropinData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
          />
        );

      case 5:
        return (
          <NavigationPage
            dropinData={dropinData}
            setDropinData={setDropinData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            progress={progress}
            setProgress={setProgress}
          />
        );

      case 6:
        return (
          <CoverImagePage
            dropinData={dropinData}
            setDropinData={setDropinData}
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
            dropinData={dropinData}
            setDropinData={setDropinData}
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
    <ProtectedRoute>
      <div className="bg-[#f4f4f4] w-[100vw]">
        <div className="bg-[#fff] max-w-[900px] min-h-[100vh] mx-auto relative">
          {/* Header */}
          <CreateDropinHeader
            dropinData={dropinData}
            showPostBtn={showPostBtn}
            progress={progress}
          />

          {/* Divider */}
          <hr />

          {/* Editor */}
          <div className="w-full px-[14px] min-[600px]:px-[28px]">
            {renderPage()}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export const Route = createFileRoute("/createDropin")({
  component: RouteComponent,
  validateSearch: () => ({}),
});
