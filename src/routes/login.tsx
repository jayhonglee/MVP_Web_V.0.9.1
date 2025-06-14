import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/auth/useAuth";
import { useMutation } from "@tanstack/react-query";
import NavBar from "../components/NavBar";

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const loginMutation = useMutation({
    mutationFn: async (userData: { email: string; password: string }) => {
      try {
        await signIn(userData.email, userData.password);
        navigate({ to: "/" });
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="w-full h-[731px] p-[100px_14px_0] min-[600px]:h-[747px] mobile:h-[859px] mobile:p-[125.6px_0_0_0] flex flex-col justify-start items-center">
      <div className="w-full max-w-[587px]">
        {/* Navbar */}
        <div className="hidden mobile:block">
          <NavBar currentPage="all" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-medium tracking-wider mb-[60px] text-center h-[22px]">
          HANGOUT
        </h1>

        {/* Email Input */}
        <div className="flex flex-col items-center w-full mb-[32px]">
          <div className="flex justify-start items-center w-full h-[32px] mobile:h-[36px]">
            <p className="m-0 text-[16px] font-[500] leading-[24px] tracking-[-0.25px] text-[#383535] h-[24px] mobile:text-[20px]">
              Email
            </p>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col items-center w-full mb-[48px]">
          <div className="flex justify-start items-center w-full h-[32px] mobile:h-[36px]">
            <p className="m-0 text-[16px] font-[500] leading-[24px] tracking-[-0.25px] text-[#383535] h-[24px] mobile:text-[20px]">
              Password
            </p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          className={`w-full p-[12px] h-[50px] min-[600px]:h-[58px] min-[600px]:p-[16px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] mb-[24px] ${
            email && password && isValidEmail(email)
              ? "bg-[#F43630] text-white cursor-pointer"
              : "bg-[#DBDBDB] text-[#A2A2A2] cursor-default"
          }`}
          disabled={!email || !password || !isValidEmail(email)}
          onClick={handleLogin}
        >
          Log In
        </button>

        <hr className="bg-[#F4F4F4] w-full h-[1px] mb-[24px]" />

        {/* Sign Up Button */}
        <button
          onClick={() => navigate({ to: "/signup" })}
          className="w-full p-[12px] h-[50px] min-[600px]:h-[58px] min-[600px]:p-[16px] bg-transparent border-[1px] border-[#989696] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] text-[#383535] mobile:text-[20px] mobile:leading-[28px] mb-[24px]"
        >
          Sign up
        </button>

        <p className="text-center text-[12px] mobile:text-[16px] font-[400] leading-[20px] mobile:leading-[24px] tracking-[-0.25px] text-[rgb(102,96,96)]">
          Your data is secure and will not be shared with third parties.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: () => ({}),
});
