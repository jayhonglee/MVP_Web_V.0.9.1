import React from "react";
import { Link } from "@tanstack/react-router";
const HeaderWithBackBtn: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="bg-[#fefefe] w-full h-[56px] min-[600px]:h-[4rem] px-[14px] py-[17px] flex justify-between items-center sticky top-0">
        <Link to="/" className="text-lg font-medium tracking-wider">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#383535]"
          >
            <path
              d="M19 12H5M12 19L5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <div
          className="cursor-pointer"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: document.title,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#383535]"
          >
            <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeaderWithBackBtn;
