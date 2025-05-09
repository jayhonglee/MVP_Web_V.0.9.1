import { useState } from "react";

export default function NavigationPage({
  currentPage,
  setCurrentPage,
  progress,
  setProgress,
}: {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
}) {
  const [navigationInstructions, setNavigationInstructions] = useState("");

  return (
    <>
      <div className="w-full h-[26px] bg-transparent" />

      <p className="w-full text-[20px] mobile:text-[28px] font-[500] leading-[28px] mobile:leading-[40px] tracking-[-0.25px] text-[rgb(56,53,53)]">
        Do you have any navigation instructions?
      </p>

      <div className="w-full h-[8px] mobile:h-[16px] bg-transparent" />

      <p className="w-full text-[14px] mobile:text-[18px] font-[400] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(153,150,150)]">
        Provide detailed navigation instructions to help people find the
        location easily.
      </p>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full">
        <textarea
          value={navigationInstructions}
          onChange={(e) => setNavigationInstructions(e.target.value)}
          className="w-full h-[120px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent resize-none"
          placeholder="e.g. Enter through the main entrance, take the elevator to the 3rd floor, and look for the sign that says 'Community Room'."
        />
      </div>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full">
        {/* Next Button */}
        <button
          className={`w-full p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] bg-[#F43630] text-white cursor-pointer`}
          // disabled={!navigationInstructions}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            setProgress(progress + 15);
          }}
        >
          Next
        </button>

        <div className="w-full h-[24px] bg-transparent" />

        {/* Back Button */}
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            setProgress(progress - 15);
          }}
          className="w-full p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] bg-transparent border-[1px] border-[#989696]"
        >
          Back
        </button>
      </div>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />
    </>
  );
}
