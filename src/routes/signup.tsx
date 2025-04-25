import NavBar from "@/components/NavBar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full p-[48px_14px_0] mobile:p-[150px_0_0_0] flex flex-col justify-start items-center">
      {/* Navbar */}
      <div className="hidden mobile:block">
        <NavBar noPlaceholder />
      </div>

      <div className="w-full h-full max-w-[587px] py-[24px] flex flex-col justify-start items-start mobile:py-[40px] relative">
        <p className="w-full text-[20px] mobile:text-[28px] font-[500] leading-[28px] mobile:leading-[40px] tracking-[-0.25px] text-[rgb(56,53,53)]">
          Enter your email
        </p>

        <div className="w-full h-[8px] mobile:h-[16px] bg-transparent" />

        <p className="w-full text-[14px] mobile:text-[18px] font-[400] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(153,150,150)]">
          This will be used to log in to your account
        </p>

        <div className="w-full h-[24px] mobile:h-[60px] bg-transparent" />

        <input
          type="email"
          className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
          placeholder="example@hangout.com"
        />

        {/* Next Button */}
        <button
          className={`w-full p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px]  rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] bg-[#DBDBDB] text-[#A2A2A2] cursor-default absolute bottom-[16px]
          `}
          //   disabled={!email || !password}
        >
          Next
        </button>
      </div>
    </div>
  );
}
