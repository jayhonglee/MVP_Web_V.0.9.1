import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/auth/useAuth";
import { User } from "@/context/auth/auth.types";
import { useUpdateUserMe } from "@/hooks/users/useUpdateUserMe";
import { useUpdateProfilePictureMe } from "@/hooks/users/useUpdateProfileMe";
import { useCreatedDropins } from "@/hooks/users/useCreatedDropins";
import { useJoinedDropins } from "@/hooks/users/useJoinedDropins";
// import mockHostedDropins from "../../mock/hostedDropins.json";
// import mockJoinedDropins from "../../mock/joinedDropins.json";
import EditInfoModal from "@/components/profile/EditInfoModal";
import EditInterestsModal from "@/components/profile/EditInterestsModal";

function ProfileIndex() {
  const [selectedTab, setSelectedTab] = useState<"created" | "joined">(
    "created"
  );
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
  const [isEditInterestsModalOpen, setIsEditInterestsModalOpen] =
    useState(false);

  const { user } = useAuth();
  const userData = user?.user;
  const navigate = useNavigate();

  const { mutate: updateUserMe } = useUpdateUserMe();
  const { mutate: updateProfilePicture } = useUpdateProfilePictureMe();
  const { createdDropins } = useCreatedDropins(userData?._id || "");
  const { joinedDropins } = useJoinedDropins(userData?._id || "");
  console.log("createdDropins", createdDropins);

  const handleEditInfo = () => {
    setIsEditInfoModalOpen(true);
  };

  const handleEditInterests = () => {
    setIsEditInterestsModalOpen(true);
  };

  const handleSave = async (updatedUser: Partial<User["user"]>) => {
    updateUserMe(updatedUser, {
      onSuccess: () => {
        console.log("User updated successfully");
      },
      onError: (error) => {
        console.error("Error updating user:", error);
      },
    });
  };

  return (
    <div className="w-full mobile:pl-[14px]">
      {/* Edit Info Modal */}
      <EditInfoModal
        user={userData || ({} as User["user"])}
        isOpen={isEditInfoModalOpen}
        onClose={() => setIsEditInfoModalOpen(false)}
        onSave={handleSave}
      />

      <EditInterestsModal
        user={userData || ({} as User["user"])}
        isOpen={isEditInterestsModalOpen}
        onClose={() => setIsEditInterestsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Profile */}
      <div className="w-full h-[129px] mobile:h-[300px] flex justify-between items-end">
        <img
          src={userData?.avatar}
          alt="profile cover"
          className="w-[84px] h-[84px] mobile:w-[142px] mobile:h-[142px] mb-[14px] object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.src = "/default-profile-image.png";
          }}
        />

        <div className="relative">
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg"
            className="absolute inset-0 w-0 h-0 opacity-0"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Handle file upload logic here
                console.log("file", file);
                updateProfilePicture(file);
                console.log("userData", userData);
              }
            }}
          />
          <label
            htmlFor="avatar"
            className="h-[30px] text-[rgb(119,228,90)] bg-[rgb(119,228,90)] bg-opacity-[0.15] px-[10px] py-[4px] rounded-[100px] cursor-pointer text-[14px] font-[500] leading-[22px] tracking-[-0.25px] flex justify-center items-center gap-[2px] mobile:text-[16px] mobile:leading-[24px]"
          >
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
          </label>
        </div>
      </div>

      <div className="w-full h-[24px] bg-transparent" />

      {/* Name / Gender / ID */}
      <div>
        <p className="text-[18px] font-bold leading-[26px] tracking-[-0.25px] text-[rgba(56,53,53)] mobile:text-[24px] mobile:leading-[36px]">
          {userData?.firstName} {userData?.lastName}{" "}
          {userData?.gender && `(${userData.gender})`}
        </p>
        <p className="text-[13px] font-[500] leading-[21px] tracking-[-0.25px] text-[#536471] mobile:text-[19px] mobile:leading-[31px]">
          {userData?.email}
        </p>
      </div>

      <div className="w-full h-[18px] bg-transparent" />

      {/* Introduction */}
      <div className="flex items-center gap-[4px]">
        <p className="text-[13px] font-[500] italic leading-[21px] tracking-[-0.25px] text-[#383535] mobile:text-[19px] mobile:leading-[31px] line-clamp-3">
          {userData?.introduction
            ? [userData.introduction].filter(Boolean).join(", ")
            : "Enter introduction"}
        </p>
      </div>

      <div className="w-full h-[18px] bg-transparent" />

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
          {userData?.dateOfBirth
            ? new Date(userData.dateOfBirth).toLocaleDateString()
            : "Enter date of birth"}
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
          {userData?.address
            ? [
                userData.address.placeName,
                userData.address.city,
                userData.address.province,
                userData.address.country,
                userData.address.postalCode,
              ]
                .filter(Boolean)
                .join(", ")
            : "Enter address"}
        </p>
      </div>

      <div className="w-full h-[12px] bg-transparent" />

      {/* Interests */}
      <div className="flex flex-wrap gap-[9px]">
        {userData?.interests && userData.interests.length > 0 ? (
          userData.interests.map((interest, index) => (
            <div
              key={index}
              className="h-[30px] text-[#383535] bg-[#f4f4f4] px-[10px] py-[4px] rounded-[100px] text-[14px] font-[400] leading-[22px] tracking-[-0.25px] flex justify-center items-center mobile:text-[16px] mobile:leading-[24px]"
            >
              {interest}
            </div>
          ))
        ) : (
          <div className="h-[30px] text-[#383535] bg-[#f4f4f4] px-[10px] py-[4px] rounded-[100px] text-[14px] font-[400] leading-[22px] tracking-[-0.25px] flex justify-center items-center mobile:text-[16px] mobile:leading-[24px]">
            No Interests :/
          </div>
        )}
        {/* <div className="h-[30px] text-[#383535] bg-[#f4f4f4] px-[10px] py-[4px] rounded-[100px] text-[14px] font-[500] leading-[22px] tracking-[-0.25px] flex justify-center items-center mobile:text-[16px] mobile:leading-[24px] cursor-pointer shrink-0 whitespace-nowrap">
          + Add Interest
        </div> */}
      </div>

      <div className="w-full h-[56px] mobile:h-[108px] bg-transparent" />

      {/* Edit Info / Edit Interests */}
      <div className="w-full flex justify-between items-center gap-[9px] mobile:gap-[24px]">
        <div
          className="flex-1 flex justify-center items-center p-[8px] mobile:p-[16px] rounded-[8px] border-[#dbdbdb] border-[1px] h-[38px] mobile:h-[60px] cursor-pointer"
          onClick={handleEditInfo}
        >
          <p className="text-[12px] mobile:text-[18px] font-[500] leading-[20px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Edit Info
          </p>
        </div>
        <div
          className="flex-1 flex justify-center items-center p-[8px] mobile:p-[16px] rounded-[8px] border-[#dbdbdb] border-[1px] h-[38px] mobile:h-[60px] cursor-pointer"
          onClick={handleEditInterests}
        >
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
            {createdDropins?.length}
          </p>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <p className="text-[12px] mobile:text-[16px] font-[400] leading-[20px] mobile:leading-[24px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Joined
          </p>
          <p className="text-[12px] mobile:text-[16px] font-[500] leading-[20px] mobile:leading-[24px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            {joinedDropins?.length}
          </p>
        </div>
      </div>

      <div className="w-full h-[0px] mobile:h-[30px] bg-transparent" />

      {/* Created / Joined Buttons */}
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

      {/* Created / Joined List */}
      <div className="w-full grid grid-cols-3 gap-[3px]">
        {selectedTab === "created"
          ? createdDropins?.map((dropin: any) => (
              <div className="relative w-full h-[120px] mobile:h-[211px] cursor-pointer group">
                <img
                  src={
                    dropin.dropInImage
                      ? dropin.dropInImage
                      : "/default-dropin-image.png"
                  }
                  alt="dropin"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98' height='98' viewBox='0 0 98 98'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B'/%3E%3Cstop offset='100%25' style='stop-color:%23FF8E53'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='98' height='98' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='bold' fill='white'%3EHANGOUT%3C/text%3E%3C/svg%3E";
                  }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100"
                  onClick={() => {
                    navigate({
                      to: `/dropin?id=${dropin._id}`,
                    });
                  }}
                >
                  <div className="flex items-center space-x-4 text-white text-lg font-semibold gap-[4px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="text-white mobile:w-[24px] mobile:h-[24px]"
                      fill="currentColor"
                      width="16"
                      height="16"
                    >
                      <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
                    </svg>{" "}
                    {dropin.attendeesCount}
                  </div>
                </div>
              </div>
            ))
          : joinedDropins?.map((dropin) => (
              <div className="relative w-full h-[120px] mobile:h-[211px] cursor-pointer group">
                <img
                  src={
                    dropin.dropInImage
                      ? dropin.dropInImage
                      : "/default-dropin-image.png"
                  }
                  alt="dropin"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98' height='98' viewBox='0 0 98 98'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B'/%3E%3Cstop offset='100%25' style='stop-color:%23FF8E53'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='98' height='98' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='bold' fill='white'%3EHANGOUT%3C/text%3E%3C/svg%3E";
                  }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100"
                  onClick={() => {
                    navigate({
                      to: `/dropin?id=${dropin._id}`,
                    });
                  }}
                >
                  <div className="flex items-center space-x-4 text-white text-lg font-semibold gap-[4px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="text-white mobile:w-[24px] mobile:h-[24px]"
                      fill="currentColor"
                      width="16"
                      height="16"
                    >
                      <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
                    </svg>{" "}
                    {dropin.attendeesCount}
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="w-full h-[24px] mobile:h-[60px] bg-transparent" />
    </div>
  );
}

export const Route = createFileRoute("/profile/")({
  component: ProfileIndex,
});

// _id: string;
// email: string;
// firstName: string;
// lastName: string;
// gender?: string;
// dateOfBirth?: string;
// address?: UserAddress;
// avatar?: string;
// introduction?: string;
// interests?: string[];
// createdAt: string;
// updatedAt: string;
// __v: number;
