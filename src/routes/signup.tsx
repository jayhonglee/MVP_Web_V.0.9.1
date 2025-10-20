import NavBar from "@/components/NavBar";
import getSignupErrorMessage from "@/utils/getSignupErrorMessage";
import ErrorModal from "@/components/errorModal/ErrorModal.tsx";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { EmailInput } from "@/components/signupCarouselPages/EmailInput";
import { PasswordInput } from "@/components/signupCarouselPages/PasswordInput";
import { NameInput } from "@/components/signupCarouselPages/NameInput";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth/useAuth";

function RouteComponent() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signUp } = useAuth();
  const signupMutation = useMutation({
    mutationFn: async (userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      try {
        await signUp(userData);
        navigate({ to: "/" });
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  });

  const handleSignup = () => {
    const userData = {
      email,
      password,
      lastName,
      firstName,
    };

    signupMutation.mutate(userData);
  };

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
    <div className="w-[100vw] h-[100vh] p-[48px_0_0] mobile:p-[150px_0_0_0] flex flex-col justify-start items-center overflow-x-hidden">
      {/* Navbar */}
      <div className="hidden mobile:block">
        <NavBar noPlaceholder currentPage="all" />
      </div>

      {signupMutation.isError && (
        <div className="w-full max-w-[615px] flex justify-center items-center">
          <ErrorModal
            errorMessage={getSignupErrorMessage(signupMutation.error.message)}
          />
        </div>
      )}

      <div className="w-full h-full py-[24px] flex justify-start items-start mobile:py-[40px] relative carousel-track transition-transform duration-300">
        <EmailInput
          email={email}
          setEmail={setEmail}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <NameInput
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          handleSignup={handleSignup}
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
