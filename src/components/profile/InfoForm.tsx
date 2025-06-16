import { useState } from "react";
import { User } from "@/context/auth/auth.types";

interface InfoFormProps {
  user: User["user"];
  onSubmit: (updatedUser: Partial<User["user"]>) => Promise<void>;
  isLoading: boolean;
}

export default function InfoForm({ user, onSubmit, isLoading }: InfoFormProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    gender: user.gender || "",
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
    introduction: user.introduction || "",
    interests: user.interests || [],
    address: {
      placeName: user.address?.placeName || "",
      city: user.address?.city || "",
      province: user.address?.province || "",
      country: user.address?.country || "",
      postalCode: user.address?.postalCode || "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block py-[16px] text-sm font-[700] leading-[20px] tracking-[-0.25px] text-[rgb(56,53,53)] break-words">
            First Name
          </label>
          <input
            type="text"
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full h-[42px] px-[16px] py-[10px] border rounded-[12px] border-[rgb(219,223,228)] focus:outline-none focus:border-[#0C1014] transition-colors"
            required
          />
        </div>
        <div>
          <label className="block py-[16px] text-sm font-[700] leading-[20px] tracking-[-0.25px] text-[rgb(56,53,53)] break-words">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full h-[42px] px-[16px] py-[10px] border rounded-[12px] border-[rgb(219,223,228)] focus:outline-none focus:border-[#0C1014] transition-colors"
            required
          />
        </div>
      </div>

      <div>
        <label className="block py-[16px] text-sm font-[700] leading-[20px] tracking-[-0.25px] text-[rgb(56,53,53)] break-words">
          Gender
        </label>
        <select
          value={formData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
          className="w-full h-[42px] px-[16px] py-[10px] border rounded-[12px] border-[rgb(219,223,228)] focus:outline-none focus:border-[#0C1014] transition-colors"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block py-[16px] text-sm font-[700] leading-[20px] tracking-[-0.25px] text-[rgb(56,53,53)] break-words">
          Date of Birth
        </label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          className="w-full px-[16px] py-[10px] border rounded-[12px] border-[rgb(219,223,228)] focus:outline-none focus:border-[#0C1014] transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="introduction"
          className="block py-[16px] text-sm font-[700] leading-[20px] tracking-[-0.25px] text-[rgb(56,53,53)] break-words"
        >
          Introduction
        </label>
        <textarea
          id="introduction"
          placeholder="Introduction"
          value={formData.introduction}
          style={{ resize: "none", height: "62px" }}
          onChange={(e) => handleInputChange("introduction", e.target.value)}
          className="w-full px-[16px] py-[10px] border rounded-[12px] border-[rgb(219,223,228)] focus:outline-none focus:border-[#0C1014] transition-colors"
          rows={3}
        />
      </div>

      <div>
        <label className="block py-[16px] text-sm font-[700] leading-[20px] tracking-[-0.25px] text-[rgb(56,53,53)] break-words">
          Address
        </label>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Place name"
            value={formData.address.placeName}
            onChange={(e) => handleAddressChange("placeName", e.target.value)}
            className="w-full h-[42px] px-[16px] py-[10px] border rounded-[12px] border-[rgb(219,223,228)] focus:outline-none focus:border-[#0C1014] transition-colors"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="City"
              value={formData.address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="w-full h-[42px] px-[16px] py-[10px] border rounded-[12px] border-[rgb(219,223,228)] focus:outline-none focus:border-[#0C1014] transition-colors"
            />
            <input
              type="text"
              placeholder="Province"
              value={formData.address.province}
              onChange={(e) => handleAddressChange("province", e.target.value)}
              className="w-full h-[42px] px-[16px] py-[10px] border rounded-[12px] border-[rgb(219,223,228)] focus:outline-none focus:border-[#0C1014] transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Country"
              value={formData.address.country}
              onChange={(e) => handleAddressChange("country", e.target.value)}
              className="w-full h-[42px] px-[16px] py-[10px] border rounded-[12px] border-[rgb(219,223,228)] focus:outline-none focus:border-[#0C1014] transition-colors"
            />
            <input
              type="text"
              placeholder="Postal code"
              value={formData.address.postalCode}
              onChange={(e) =>
                handleAddressChange("postalCode", e.target.value)
              }
              className="w-full h-[42px] px-[16px] py-[10px] border rounded-[12px] border-[rgb(219,223,228)] focus:outline-none focus:border-[#0C1014] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Saving.." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
