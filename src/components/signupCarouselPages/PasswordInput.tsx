export function PasswordInput({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  currentIndex,
  setCurrentIndex,
}: {
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) {
  const isValidPassword =
    /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,20}$/.test(password);
  const isValidConfirmPassword = password === confirmPassword;

  return (
    <div className="w-full h-full flex flex-col justify-start items-center flex-shrink-0 flex-grow-0">
      <div className="w-full max-w-[615px] flex flex-col justify-start items-start">
        <p className="w-full text-[20px] mobile:text-[28px] font-[500] leading-[28px] mobile:leading-[40px] tracking-[-0.25px] text-[rgb(56,53,53)] px-[14px]">
          Create a password
        </p>

        <div className="w-full h-[8px] mobile:h-[16px] bg-transparent" />

        <p className="w-full text-[14px] mobile:text-[18px] font-[400] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(153,150,150)] px-[14px]">
          8-20 characters, letters, numbers, special characters.
        </p>

        <div className="w-full h-[24px] mobile:h-[60px] bg-transparent" />

        <div className="w-full px-[14px]">
          <p className="text-[16px] mobile:text-[20px] font-[500] leading-[24px] mobile:leading-[28px] tracking-[-0.25px] text-[rgb(56,53,53)] mb-[8px]">
            Password
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
            placeholder="Enter your password"
          />
        </div>

        <div className="w-full h-[32px] mobile:h-[56px] bg-transparent" />

        <div className="w-full px-[14px]">
          <p className="text-[16px] mobile:text-[20px] font-[500] leading-[24px] mobile:leading-[28px] tracking-[-0.25px] text-[rgb(56,53,53)] mb-[8px]">
            Confirm Password
          </p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
            placeholder="Confirm your password"
          />
        </div>
        <div className="w-full h-[60px] mobile:h-[120px] bg-transparent" />

        <div className="w-full max-w-[615px] px-[14px] flex flex-col justify-start items-start">
          {/* Next Button */}
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className={`w-full max-w-[615px] p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] ${
              isValidPassword && isValidConfirmPassword
                ? "bg-[#F43630] text-white cursor-pointer"
                : "bg-[#DBDBDB] text-[#A2A2A2] cursor-default"
            }`}
            disabled={!isValidPassword || !isValidConfirmPassword}
          >
            Next
          </button>

          <div className="w-full h-[24px] bg-transparent" />

          {/* Back Button */}
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="w-full max-w-[615px] p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] bg-transparent border-[1px] border-[#989696]"
          >
            Back
          </button>
        </div>

        <div className="w-full h-[60px] mobile:h-[120px] bg-transparent" />
      </div>
    </div>
  );
}
