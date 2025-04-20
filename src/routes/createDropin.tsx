import { createFileRoute } from "@tanstack/react-router";
import HeaderWithBackBtn from "../components/HeaderWithBackBtn";
// import { useAuth } from "../context/auth/useAuth";

function RouteComponent() {
  return (
    <div className="bg-[#f4f4f4] w-[100vw]">
      <div className="bg-[#fff] max-w-[900px] min-h-[100vh] mx-auto relative">
        <HeaderWithBackBtn />

        {/* Divider */}
        <div className="h-[6px] bg-[#f4f4f4]"></div>

        {/* Description */}
        <div className="px-[14px] min-[600px]:px-[28px] py-[24px]">
          {/* Drop-in ID: {id} */}
        </div>

        {/* Bottom Margin */}
        <div className="w-full h-[86px]" />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/createDropin")({
  component: RouteComponent,
});
