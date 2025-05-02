import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import mockUserProfile from "../../mock/profile.json";

export const Route = createFileRoute("/profile/")({
  component: ProfileIndex,
});

function ProfileIndex() {
  const [selectedTab, setSelectedTab] = useState<"created" | "joined">(
    "created"
  );

  return (
    <div className="w-full mobile:pl-[14px]">
      {/* Profile */}
      <div className="w-full h-[129px] mobile:h-[300px] flex justify-between items-end">
        <img
          src={mockUserProfile.avatar_url}
          alt="profile cover"
          className="w-[84px] h-[84px] mobile:w-[142px] mobile:h-[142px] mb-[14px] object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.src = "/default-profile-image.png";
          }}
        />

        <div className="h-[30px] text-[rgb(119,228,90)] bg-[rgb(119,228,90)] bg-opacity-[0.15] px-[10px] py-[4px] rounded-[100px] cursor-pointer text-[14px] font-[500] leading-[22px] tracking-[-0.25px] flex justify-center items-center gap-[2px] mobile:text-[16px] mobile:leading-[24px]">
          <p>Update Profile</p>
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="mobile:w-[15px] mobile:h-[15px]"
            width="14"
            height="14"
            fill="none"
          >
            <path
              fill="#77e45a"
              fill-rule="evenodd"
              d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.522 2 12A10 10 0 0 1 12 2"
              clip-rule="evenodd"
            ></path>
            <path
              stroke="#FEFEFE"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m11 8.5 2.933 3.215a.64.64 0 0 1 0 .57L11 15.5"
            ></path>
          </svg>
        </div>
      </div>

      <div className="w-full h-[24px] bg-transparent" />

      {/* Name / Gender / ID */}
      <div>
        <p className="text-[18px] font-[500] leading-[26px] tracking-[-0.25px] text-[rgba(56,53,53)] mobile:text-[24px] mobile:leading-[36px]">
          {mockUserProfile.full_name} ({mockUserProfile.gender})
        </p>
        <p className="text-[13px] font-[500] leading-[21px] tracking-[-0.25px] text-[#536471] mobile:text-[19px] mobile:leading-[31px]">
          @{mockUserProfile.id}
        </p>
      </div>

      <div className="w-full h-[12px] bg-transparent" />

      {/* Date of Birth */}
      <div className="flex items-center gap-[4px]">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-[16px] h-[16px] mobile:w-[22px] mobile:h-[22px] text-[#536471]"
          fill="currentColor"
        >
          <g>
            <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
          </g>
        </svg>
        <p className="text-[13px] font-[500] leading-[21px] tracking-[-0.25px] text-[#536471] mobile:text-[19px] mobile:leading-[31px] line-clamp-1">
          {mockUserProfile.date_of_birth}
        </p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-[4px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="w-[16px] h-[16px] mobile:w-[22px] mobile:h-[22px] text-[#536471] shrink-0"
          fill="currentColor"
        >
          <path d="M565.6 36.2C572.1 40.7 576 48.1 576 56l0 336c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456L0 120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5l0 284.6 120-45.7 0-284.6L48 136.5zM360 422.7l0-285.4-144-48 0 285.4 144 48zm48-1.5l120-45.7 0-284.6L408 136.5l0 284.6z" />
        </svg>
        <p className="text-[13px] font-[500] leading-[21px] tracking-[-0.25px] text-[#536471] mobile:text-[19px] mobile:leading-[31px] line-clamp-1">
          {mockUserProfile.address.place_name}, {mockUserProfile.address.city},{" "}
          {mockUserProfile.address.state}, {mockUserProfile.address.country}
        </p>
      </div>

      <div className="w-full h-[12px] bg-transparent" />

      {/* Interests */}
      <div className="flex flex-wrap gap-[9px]">
        {mockUserProfile.interests.map((interest) => (
          <div className="h-[30px] text-[#383535] bg-[#f4f4f4] px-[10px] py-[4px] rounded-[100px] text-[14px] font-[400] leading-[22px] tracking-[-0.25px] flex justify-center items-center mobile:text-[16px] mobile:leading-[24px]">
            {interest}
          </div>
        ))}
        {/* <div className="h-[30px] text-[#383535] bg-[#f4f4f4] px-[10px] py-[4px] rounded-[100px] text-[14px] font-[500] leading-[22px] tracking-[-0.25px] flex justify-center items-center mobile:text-[16px] mobile:leading-[24px] cursor-pointer shrink-0 whitespace-nowrap">
          + Add Interest
        </div> */}
      </div>

      <div className="w-full h-[56px] mobile:h-[108px] bg-transparent" />

      {/* Edit Info / Edit Interests */}
      <div className="w-full flex justify-between items-center gap-[9px] mobile:gap-[24px]">
        <div className="flex-1 flex justify-center items-center p-[8px] mobile:p-[16px] rounded-[8px] border-[#dbdbdb] border-[1px] h-[38px] mobile:h-[60px] cursor-pointer">
          <p className="text-[12px] mobile:text-[18px] font-[500] leading-[20px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Edit Info
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center p-[8px] mobile:p-[16px] rounded-[8px] border-[#dbdbdb] border-[1px] h-[38px] mobile:h-[60px] cursor-pointer">
          <p className="text-[12px] mobile:text-[18px] font-[500] leading-[20px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Edit Interests
          </p>
        </div>
      </div>

      <div className="w-full h-[24px] mobile:h-[60px] bg-transparent" />

      {/* Created / Joined */}
      <div className="flex items-center gap-[32px]">
        <div className="flex flex-col items-center gap-[8px]">
          <p className="text-[12px] mobile:text-[16px] font-[400] leading-[20px] mobile:leading-[24px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Created
          </p>
          <p className="text-[12px] mobile:text-[16px] font-[500] leading-[20px] mobile:leading-[24px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            {mockUserProfile.created}
          </p>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <p className="text-[12px] mobile:text-[16px] font-[400] leading-[20px] mobile:leading-[24px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Joined
          </p>
          <p className="text-[12px] mobile:text-[16px] font-[500] leading-[20px] mobile:leading-[24px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            {mockUserProfile.joined}
          </p>
        </div>
      </div>

      <div className="w-full h-[0px] mobile:h-[30px] bg-transparent" />

      {/* Created / Joined List */}
      <div className="w-full h-[72px] mobile:h-[104px] flex items-center gap-0">
        <div
          className={`flex-1 h-[30px] mobile:h-[44px]  ${selectedTab === "created" ? "border-b-[2px] border-[#383535]" : "border-b-[1px] border-[#f4f4f4]"} flex justify-center items-center cursor-pointer`}
          onClick={() => setSelectedTab("created")}
        >
          <p
            className={`text-[14px] mobile:text-[18px] font-[500] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] ${
              selectedTab === "created" ? "text-[#383535]" : "text-[#b9b6b6]"
            }`}
          >
            Created
          </p>
        </div>
        <div
          className={`flex-1 h-[30px] mobile:h-[44px]  ${selectedTab === "joined" ? "border-b-[2px] border-[#383535]" : "border-b-[1px] border-[#f4f4f4]"} flex justify-center items-center cursor-pointer`}
          onClick={() => setSelectedTab("joined")}
        >
          <p
            className={`text-[14px] mobile:text-[18px] font-[500] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] ${
              selectedTab === "joined" ? "text-[#383535]" : "text-[#b9b6b6]"
            }`}
          >
            Joined
          </p>
        </div>
      </div>
    </div>
  );
}
