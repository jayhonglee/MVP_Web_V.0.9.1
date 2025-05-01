import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
  component: ProfileIndex,
});

function ProfileIndex() {
  return (
    <div className="w-full mobile:pl-[14px]">
      {/* Profile */}
      <div className="w-full h-[129px] mobile:h-[300px] flex justify-between items-end">
        <img
          src="/"
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

      {/* Name */}
      <div>
        <p className="text-[18px] font-[500] leading-[26px] tracking-[-0.25px] text-[rgba(56,53,53)] mobile:text-[24px] mobile:leading-[36px]">
          Member 123
        </p>
      </div>
    </div>
  );
}
