import { DropinData } from "@/routes/createDropin";

export default function CoverImagePage({
  dropinData,
  setDropinData,
  currentPage,
  setCurrentPage,
  progress,
  setProgress,
  setShowPostBtn,
}: {
  dropinData: DropinData;
  setDropinData: (dropinData: DropinData) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  setShowPostBtn: (showPostBtn: boolean) => void;
}) {
  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/jpg";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setDropinData({
          ...dropinData,
          dropInImage: file,
        });
      }
    };
    input.click();
  };

  const defaultDropInImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98' height='98' viewBox='0 0 98 98'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B'/%3E%3Cstop offset='100%25' style='stop-color:%23FF8E53'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='98' height='98' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='bold' fill='white'%3EHANGOUT%3C/text%3E%3C/svg%3E";

  return (
    <>
      <div className="w-full h-[26px] bg-transparent" />

      <p className="w-full text-[20px] mobile:text-[28px] font-[500] leading-[28px] mobile:leading-[40px] tracking-[-0.25px] text-[rgb(56,53,53)]">
        Choose a cover image
      </p>

      <div className="w-full h-[8px] mobile:h-[16px] bg-transparent" />

      <p className="w-full text-[14px] mobile:text-[18px] font-[400] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(153,150,150)]">
        This will be the first thing people see when they search for your
        Drop-In.
      </p>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full h-[129px] mobile:h-[300px] flex justify-center items-center">
        <div className="relative cursor-pointer" onClick={handleFileSelect}>
          <img
            src={
              dropinData.dropInImage
                ? URL.createObjectURL(dropinData.dropInImage)
                : defaultDropInImage
            }
            alt="cover image"
            className="w-[84px] h-[84px] mobile:w-[142px] mobile:h-[142px] object-cover rounded-full border-[1px] mobile:border-[2px] border-[#999696]"
            onError={(e) => {
              e.currentTarget.src = defaultDropInImage;
            }}
          />
          <div className="absolute bottom-0 right-0">
            <div className="bg-white w-[32px] mobile:w-[40px] h-[32px] mobile:h-[40px] rounded-full flex justify-center items-center p-2 border-[1px] mobile:border-[2px] border-[#999696]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="full"
                height="full"
                className="text-[#999696]"
                fill="currentColor"
              >
                <path d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full">
        {/* Next Button */}
        <button
          className="w-full p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] bg-[#F43630] text-white cursor-pointer"
          onClick={() => {
            setCurrentPage(currentPage + 1);
            setProgress(progress + 10);
            setShowPostBtn(true);
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
