import { useState } from "react";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useAuth } from "../context/auth/useAuth";
import ProtectedRoute from "../context/auth/ProtectedRoute";
import NavBar from "../components/NavBar";

const tabs = [
  { name: "Profile", path: "" },
  { name: "Group Chat", path: "group-chat" },
  { name: "Logout", path: "logout" },
];

function RouteComponent() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const router = useRouter();

  const { signOut } = useAuth();

  return (
    <ProtectedRoute>
      <div className="w-full h-[731px] p-[64px_14px_0] min-[600px]:h-[747px] mobile:h-[859px] mobile:p-[92px_0_0_0] flex flex-col justify-start items-center">
        <div className="w-full flex justify-center items-center">
          {/* Navbar */}
          <NavBar currentPage="Profile" noPlaceholder />

          <div className="w-full max-w-[1200px] flex flex-col justify-start items-start mobile:flex-row mobile:justify-center mobile:gap-[27px] mobile:min-w-[1200px]">
            {/* < 900 px tabs */}
            <div className="w-full flex justify-start items-center gap-[20px] mobile:hidden overflow-hidden">
              {tabs.map((tab) => (
                <div
                  key={tab.path}
                  className={`h-[32px] flex justify-center items-center pb-[8px] border-b-[2px] border-[#383535] overflow-hidden shrink-0 whitespace-nowrap cursor-pointer ${
                    activeTab === tab
                      ? "border-b-[#383535] text-[#383535]"
                      : "border-b-transparent text-[#B9B6B6]"
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab.path === "logout") {
                      signOut();
                    } else router.navigate({ to: `/profile/${tab.path}` });
                  }}
                >
                  <p className="text-[16px] font-[500] leading-[24px] tracking-[-0.25px]">
                    {tab.name}
                  </p>
                </div>
              ))}
            </div>

            {/* > 900 px tabs */}
            <div className="w-[293.250px] flex-col justify-start overflow-hidden hidden mobile:block pl-[10px] shrink-0">
              {tabs.map((tab) => (
                <div
                  key={tab.path}
                  className="cursor-pointer"
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab.path === "logout") {
                      signOut();
                    } else router.navigate({ to: `/profile/${tab.path}` });
                  }}
                >
                  <p className="text-[20px] font-[500] leading-[77px] tracking-[-0.25px] text-[rgb(56,53,53)]">
                    {tab.name}
                  </p>
                  <div className="w-full max-w-[640px] min-w-[1px] h-[1px] bg-[#F4F4F4]" />
                </div>
              ))}
            </div>

            {/* tabs */}
            <div className="w-full mobile:pr-[10px]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});
