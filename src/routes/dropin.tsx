import { createFileRoute } from "@tanstack/react-router";
import HeaderWithBackBtn from "../components/HeaderWithBackBtn";
import dropInData from "../mock/dropIn.json";
import { formatDate, formatTime } from "../utils/dateUtils";
import { useAuth } from "../context/auth/useAuth";

function RouteComponent() {
  const { id } = Route.useSearch();
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <div className="bg-[#f4f4f4] w-[100vw]">
      <div className="bg-[#fff] max-w-[900px] min-h-[100vh] mx-auto">
        <HeaderWithBackBtn />

        {/* Image */}
        <div>
          <img
            className="w-full h-[281px] object-cover"
            src={dropInData.dropInImage}
            alt="Drop-in image"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98' height='98' viewBox='0 0 98 98'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B'/%3E%3Cstop offset='100%25' style='stop-color:%23FF8E53'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='98' height='98' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='bold' fill='white'%3EHANGOUT%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        {/* Info */}
        <div className="h-[191px] px-[14px] min-[600px]:px-[28px] py-[24px] flex flex-col justify-between">
          <div className="max-h-[26.5px] overflow-hidden">
            {dropInData.interestTags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#f4f4f4] text-[#666060] inline-flex justify-center items-center font-semibold text-[10px] text-center px-2 py-1 rounded-[10px] uppercase overflow-hidden text-ellipsis whitespace-nowrap mr-[8px] h-[24px]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div>
            <div className="line-clamp-1 max-h-[28px] mb-[2px]">
              <p className="m-0 text-[20px] font-[600] leading-[28px] tracking-[-0.25px] text-[rgb(56,53,53)]">
                {dropInData.title}
              </p>
            </div>
            <div className="m-0 text-[12px] font-[450] leading-[20px] tracking-[-0.25px] text-[rgb(102,96,96)] max-h-[20px]">
              <div className="truncate">
                {dropInData.category}
                {" · "}
                <img
                  src="/info_place_14px.svg"
                  alt="location"
                  className="w-[12px] h-[12px] inline-block mx-[-2px]"
                />{" "}
                {dropInData.location}
                {" · "}
                {formatDate(dropInData.date)}
                {" · "}
                {formatTime(dropInData.time)}
              </div>
            </div>
          </div>
          <hr className="border-[rgb(244,244,244)]" />
          <div className="h-[26px] flex justify-between items-center">
            <p className="m-0 text-[14px] font-[500] leading-[22px] tracking-[-0.25px]">
              Entry Fee
            </p>

            <p className="m-0 text-[18px] font-[500] leading-[26px] tracking-[-0.25px] text-[rgb(56,53,53)]">
              ${dropInData.entryFee}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[6px] bg-[#f4f4f4]"></div>

        {/* Description */}
        <div className="px-[14px] min-[600px]:px-[28px] py-[24px]">
          Drop-in ID: {id}
        </div>

        {/* Details */}
        <div className="px-[14px] min-[600px]:px-[28px] py-[24px]">
          <p className="m-0 text-[14px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(244,54,48)]">
            Details
          </p>
          <p className="m-0 text-[18px] font-[500] leading-[26px] tracking-[-0.25px] text-[rgb(56,53,53)]">
            Here are the details
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/dropin")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: search.id as string,
    };
  },
  component: RouteComponent,
});
