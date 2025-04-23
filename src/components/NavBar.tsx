import React, { useState } from "react";
import { Link } from "@tanstack/react-router";

const NavBar: React.FC<{ currentPage?: string }> = ({ currentPage = "" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Default Navbar Placeholder */}
      <div className="w-full h-[4rem] mobile:h-[80px] bg-transparent mobile:flex" />

      {/* Mobile Navbar */}
      <div className="bg-[#fefefe] fixed z-50 top-0 left-0 right-0 w-full h-[4rem] px-[14px] py-[17px] flex justify-between mobile:hidden items-center">
        <Link to="/" className="text-lg font-medium tracking-wider">
          HANGOUT
        </Link>
        <div className="flex items-center">
          <Link
            to="/login"
            className="mr-[20px] bg-[#F43630] rounded-full px-[15px] py-[5px]"
          >
            <p className="text-sm text-white font-medium flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-3 h-3 mr-1"
                fill="currentColor"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
              Login
            </p>
          </Link>
          <div
            className="w-[16px] h-[14px] flex flex-col justify-between hover:cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="w-full h-[2px] bg-[#383535]"></span>
            <span className="w-full h-[2px] bg-[#383535]"></span>
            <span className="w-full h-[2px] bg-[#383535]"></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Pop Up */}
      <div
        className={`fixed z-[999] top-0 left-0 right-0 w-[100vw] h-[100vh] bg-[#fff] flex flex-col items-center ${!isMobileMenuOpen ? "hidden" : ""} px-[14px] mobile:hidden`}
      >
        <div className="w-full h-[64px] flex justify-center items-center relative">
          <p className="text-[16px] font-[500] leading-[24px] tracking-[-0.25px] text-[rgb(56,53,53)] uppercase">
            Menu
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="w-[24px] h-[24px] absolute right-0 hover:cursor-pointer"
            fill="currentColor"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>
        <div className="w-full h-[54px] flex justify-start items-center hover:bg-[#f4f4f4] hover:cursor-pointer px-[14px] py-[16px]">
          <p className="text-[14px] font-[500] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Drop-In
          </p>
        </div>
        <div className="w-full h-[54px] flex justify-start items-center hover:bg-[#f4f4f4] hover:cursor-pointer px-[14px] py-[16px]">
          <p className="text-[14px] font-[500] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Group Chat
          </p>
        </div>
        <div className="w-full h-[54px] flex justify-start items-center hover:bg-[#f4f4f4] hover:cursor-pointer px-[14px] py-[16px]">
          <p className="text-[14px] font-[500] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Profile
          </p>
        </div>
        <div className="w-full h-[54px] flex justify-start items-center hover:bg-[#f4f4f4] hover:cursor-pointer px-[14px] py-[16px]">
          <p className="text-[14px] font-[500] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Create Drop-In
          </p>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="fixed z-50 top-0 left-0 right-0 w-full h-[80px] bg-[#e6e1e1] hidden mobile:flex justify-center items-center">
        <div className="w-[1253px] h-[74.4px] pt-[28.4px] px-[14px] pb-[17px] flex justify-center items-center mx-auto">
          <Link to="/" className="text-2xl font-medium tracking-wider">
            HANGOUT
          </Link>
          <div className="w-[1055px] h-full flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="font-[500] text-[18px] ms-[40px]">
                <p
                  className={
                    currentPage === "Drop-In"
                      ? "text-[rgb(56,53,53)]"
                      : "text-[rgb(185,182,182)]"
                  }
                >
                  Drop-In
                </p>
              </Link>
              <Link to="/" className="font-[500] text-[18px] ms-[40px]">
                <p
                  className={
                    currentPage === "Group Chat"
                      ? "text-[rgb(56,53,53)]"
                      : "text-[rgb(185,182,182)]"
                  }
                >
                  Group Chat
                </p>
              </Link>
              <Link to="/" className="font-[500] text-[18px] ms-[40px]">
                <p
                  className={
                    currentPage === "Profile"
                      ? "text-[rgb(56,53,53)]"
                      : "text-[rgb(185,182,182)]"
                  }
                >
                  Profile
                </p>
              </Link>
              <Link
                to="/createDropin"
                className="font-[500] text-[18px] ms-[40px]"
              >
                <p
                  className={
                    currentPage === "Create Drop-In"
                      ? "text-[rgb(56,53,53)]"
                      : "text-[rgb(185,182,182)]"
                  }
                >
                  Create Drop-In
                </p>
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                to="/login"
                className="bg-[#F43630] rounded-full px-[20px] py-[5px] ms-[32px] uppercase"
              >
                <p className="text-sm text-white font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                  </svg>
                  Login
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
