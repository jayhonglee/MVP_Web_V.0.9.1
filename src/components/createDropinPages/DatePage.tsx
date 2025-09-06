import { DropinData } from "@/routes/createDropin";

export default function DatePage({
  dropinData,
  setDropinData,
  currentPage,
  setCurrentPage,
  progress,
  setProgress,
}: {
  dropinData: DropinData;
  setDropinData: (dropinData: DropinData) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
}) {
  return (
    <>
      <div className="w-full h-[26px] bg-transparent" />

      <p className="w-full text-[20px] mobile:text-[28px] font-[500] leading-[28px] mobile:leading-[40px] tracking-[-0.25px] text-[rgb(56,53,53)]">
        When should we meet?
      </p>

      <div className="w-full h-[8px] mobile:h-[16px] bg-transparent" />

      <p className="w-full text-[14px] mobile:text-[18px] font-[400] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(153,150,150)]">
        Let people know when it starts.
      </p>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full">
        <input
          type="datetime-local"
          value={
            dropinData.date
              ? dropinData.date
                  .toLocaleString("en-US", {
                    timeZone: "America/Vancouver",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                  .replace(
                    /(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+)/,
                    "$3-$1-$2T$4:$5"
                  )
              : ""
          }
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            if (!isNaN(newDate.getTime())) {
              setDropinData({ ...dropinData, date: newDate });
            }
          }}
          className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
          placeholder="e.g. 2025-01-01"
        />
      </div>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full">
        {/* Next Button */}
        <button
          className={`w-full p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] ${
            dropinData.date
              ? "bg-[#F43630] text-white cursor-pointer"
              : "bg-[#DBDBDB] text-[#A2A2A2] cursor-default"
          }`}
          disabled={!dropinData.date}
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
