import NavBar from "@/components/NavBar";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { EmailInput } from "@/components/signupCarouselPages/EmailInput";
import { PasswordInput } from "@/components/signupCarouselPages/PasswordInput";

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

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});
