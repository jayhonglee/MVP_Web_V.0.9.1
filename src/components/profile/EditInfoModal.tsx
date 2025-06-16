import { useEffect, useState } from "react";
import { User } from "@/context/auth/auth.types";
import InfoForm from "./InfoForm";

interface EditInfoModalProps {
  user: User["user"];
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: Partial<User["user"]>) => Promise<void>;
}

export default function EditInfoModal({
  user,
  isOpen,
  onClose,
  onSave,
}: EditInfoModalProps) {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (updatedUser: Partial<User["user"]>) => {
    setIsLoading(true);
    try {
      await onSave(updatedUser);
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* Back Button */}
      <div className="px-[16px] h-[44px] flex justify-center items-center border-b-[1px] border-[rgb(219,219,219)]">
        <span
          className="cursor-pointer flex items-center z-[51]"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-[24px] h-[24px]"
          >
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </span>

        <h1 className="flex-1 text-center text-[16px] font-[500] leading-[26px] tracking-[-0.25px] text-[rgb(56,53,53)] -ml-[24px]">
          Edit Info
        </h1>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-[12px] py-[16px]">
        <InfoForm user={user} onSubmit={handleSave} isLoading={isLoading} />
      </div>
    </div>
  );
}
