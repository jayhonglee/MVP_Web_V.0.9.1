import { createFileRoute } from "@tanstack/react-router";
import HeaderWithBackBtn from "../components/HeaderWithBackBtn";
import dropInData from "../mock/dropIn.json";
import { formatDate, formatTime } from "../utils/dateUtils";
// import { useAuth } from "../context/auth/useAuth";

function RouteComponent() {
  const { id } = Route.useSearch();
  //   const auth = useAuth();
  //   console.log(auth);

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
          <p className="m-0 text-[18px] font-[500] leading-[26px] tracking-[-0.25px] text-[rgb(56,53,53)] mb-[16px]">
            Here are the details
          </p>
          <div className="flex flex-col justify-center items-start gap-[8px]">
            <div className="flex justify-between items-center gap-[8px] h-[24px]">
              {DetailsIcon("category")}
              <p className="m-0 text-[14px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)]">
                {dropInData.category}
              </p>
            </div>
            <div className="flex justify-between items-center gap-[8px] h-[24px]">
              {DetailsIcon("type")}
              <p className="m-0 text-[14px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)]">
                {dropInData.type}
              </p>
            </div>
            <div className="flex justify-between items-center gap-[8px] h-[24px]">
              {DetailsIcon("maxAttendees")}
              <p className="m-0 text-[14px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)]">
                Max Attendees: {dropInData.maxAttendees}
              </p>
            </div>
          </div>
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

const DetailsIcon = (type: string) => {
  switch (type) {
    case "category":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          width="18px"
          height="18px"
        >
          <path d="M88.7 223.8L0 375.8 0 96C0 60.7 28.7 32 64 32l117.5 0c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7L416 96c35.3 0 64 28.7 64 64l0 32-336 0c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224l400 0c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480L32 480c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z" />
        </svg>
      );
    case "type":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="18px"
          height="18px"
        >
          <path d="M0 80L0 229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7L48 32C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      );
    case "maxAttendees":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          width="18px"
          height="18px"
        >
          <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
        </svg>
      );
    default:
      return null;
  }
};
