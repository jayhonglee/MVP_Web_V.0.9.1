import { useState } from "react";
import { Address } from "@/hooks/map/types";

export default function AddressPage({
  currentPage,
  setCurrentPage,
  progress,
  setProgress,
}: {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
}) {
  const [address, setAddress] = useState<Address>({});

  return (
    <>
      <div className="w-full h-[26px] bg-transparent" />

      <p className="w-full text-[20px] mobile:text-[28px] font-[500] leading-[28px] mobile:leading-[40px] tracking-[-0.25px] text-[rgb(56,53,53)]">
        Where should we meet?
      </p>

      <div className="w-full h-[8px] mobile:h-[16px] bg-transparent" />

      <p className="w-full text-[14px] mobile:text-[18px] font-[400] leading-[22px] mobile:leading-[26px] tracking-[-0.25px] text-[rgb(153,150,150)]">
        Let people know where to find this Drop-In.
      </p>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full flex flex-col gap-[16px]">
        <input
          type="text"
          value={address.place_name || ""}
          onChange={(e) =>
            setAddress({ ...address, place_name: e.target.value })
          }
          className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
          placeholder="Enter a place name*"
        />

        <input
          type="text"
          value={address.address || ""}
          onChange={(e) => setAddress({ ...address, address: e.target.value })}
          className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
          placeholder="Street address*"
        />

        <div className="flex gap-[16px]">
          <input
            type="text"
            value={address.city || ""}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
            placeholder="City"
          />
          <input
            type="text"
            value={address.state || ""}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
            placeholder="State/Province"
          />
        </div>

        <div className="flex gap-[16px]">
          <input
            type="text"
            value={address.postal_code || ""}
            onChange={(e) =>
              setAddress({ ...address, postal_code: e.target.value })
            }
            className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
            placeholder="Postal code"
          />
          <input
            type="text"
            value={address.country || ""}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            className="w-full h-[56px] m-0 px-[14px] py-[16.5px] border-[1px] rounded-[8px] border-[#c4c4c4] cursor-text focus-within:border-[#362526] focus-within:outline-none focus-within:border-[2px] focus:placeholder-transparent"
            placeholder="Country"
          />
        </div>
      </div>

      <div className="w-full h-[30px] min-[600px]:h-[60px] bg-transparent" />

      <div className="w-full">
        {/* Next Button */}
        <button
          className={`w-full p-[12px] min-[600px]:p-[16px] h-[50px] min-[600px]:h-[58px] rounded-[999px] text-[16px] font-[500] leading-[24px] tracking-[-0.25px] mobile:text-[20px] mobile:leading-[28px] ${
            address.place_name && address.address
              ? "bg-[#F43630] text-white cursor-pointer"
              : "bg-[#DBDBDB] text-[#A2A2A2] cursor-default"
          }`}
          disabled={!address.place_name || !address.address}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            setProgress(progress + 15);
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
