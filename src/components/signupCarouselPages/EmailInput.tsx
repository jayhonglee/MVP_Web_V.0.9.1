import { useState } from "react";

export function EmailInput({
  currentIndex,
  setCurrentIndex,
}: {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) {
  const [email, setEmail] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center flex-shrink-0 flex-grow-0">
      <div className="w-full max-w-[615px] flex flex-col justify-start items-start">
        <p className="w-full text-[20px] mobile:text-[28px] font-[500] leading-[28px] mobile:leading-[40px] tracking-[-0.25px] text-[rgb(56,53,53)] px-[14px]">
          Enter your email
        </p>

        <div className="w-full h-[8px] mobile:h-[16px] bg-transparent" />

        <p className="w-full text-[14px] mobile:text-[18px] font-[400] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(153,150,150)] px-[14px]">
          This will be used to log in to your account
        </p>

        <div className="w-full h-[24px] mobile:h-[60px] bg-transparent" />

        <div className="w-full px-[14px]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
            placeholder="example@hangout.com"
          />
        </div>

        <div className="w-full max-w-[615px] absolute bottom-[16px] px-[14px]">
          {/* Next Button */}
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className={`w-full max-w-[615px] p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] ${
              isValidEmail
                ? "bg-[#F43630] text-white cursor-pointer"
                : "bg-[#DBDBDB] text-[#A2A2A2] cursor-default"
            }`}
            disabled={!email || !isValidEmail}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
