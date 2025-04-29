import NavBar from "@/components/NavBar";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const track = document.querySelector(".carousel-track");
      if (!track) return;
      const distance = -currentIndex * window.innerWidth;
      (track as HTMLElement).style.transform = `translateX(${distance}px)`;
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial position

    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  return (
    <div className="w-[100vw] h-[100vh] p-[48px_0_0] mobile:p-[150px_0_0_0] flex flex-col justify-start items-center overflow-hidden">
      {/* Navbar */}
      <div className="hidden mobile:block">
        <NavBar noPlaceholder />
      </div>

      <div className="w-full h-full py-[24px] flex justify-start items-start mobile:py-[40px] relative carousel-track transition-transform duration-300">
        <EmailInput
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <PasswordInput
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
}

function EmailInput({
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
            disabled={!isValidEmail}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function PasswordInput({
  currentIndex,
  setCurrentIndex,
}: {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) {
  const [password, setPassword] = useState("");
  const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
    password
  );

  return (
    <div className="w-full h-full flex flex-col justify-start items-center flex-shrink-0 flex-grow-0">
      <div className="w-full max-w-[615px] flex flex-col justify-start items-start">
        <p className="w-full text-[20px] mobile:text-[28px] font-[500] leading-[28px] mobile:leading-[40px] tracking-[-0.25px] text-[rgb(56,53,53)] px-[14px]">
          Enter your password
        </p>

        <div className="w-full h-[8px] mobile:h-[16px] bg-transparent" />

        <p className="w-full text-[14px] mobile:text-[18px] font-[400] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(153,150,150)] px-[14px]">
          This will be used to log in to your account
        </p>

        <div className="w-full h-[24px] mobile:h-[60px] bg-transparent" />

        <div className="w-full px-[14px]">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
            placeholder="********"
          />
        </div>

        <div className="w-full max-w-[615px] absolute bottom-[16px] px-[14px] flex flex-col justify-start items-start">
          {/* Next Button */}
          <button
            onClick={() => updateSlidePosition(2)}
            className={`w-full max-w-[615px] p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] ${
              isValidPassword
                ? "bg-[#F43630] text-white cursor-pointer"
                : "bg-[#DBDBDB] text-[#A2A2A2] cursor-default"
            }`}
            disabled={!isValidPassword}
          >
            Next
          </button>

          <div className="w-full h-[24px] bg-transparent" />

          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="w-full max-w-[615px] p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] bg-transparent border-[1px] border-[#989696]"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
