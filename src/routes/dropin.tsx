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
            Information
          </p>
          <p className="m-0 text-[18px] font-[500] leading-[26px] tracking-[-0.25px] text-[rgb(56,53,53)] mb-[16px]">
            Here are the details
          </p>
          <div className="flex flex-col justify-center items-start gap-[8px]">
            <div className="flex justify-between items-center gap-[8px] h-[24px]">
              {DetailsIcon("category")}
              <p className="m-0 text-[14px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)] line-clamp-1 flex-1">
                {dropInData.category}
              </p>
            </div>
            <div className="flex justify-between items-center gap-[8px] h-[24px]">
              {DetailsIcon("type")}
              <p className="m-0 text-[14px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)] line-clamp-1 flex-1">
                {dropInData.type}
              </p>
            </div>
            <div className="flex justify-between items-center gap-[8px] h-[24px]">
              {DetailsIcon("maxAttendees")}
              <p className="m-0 text-[14px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)] line-clamp-1 flex-1">
                Max {dropInData.maxAttendees} people
              </p>
            </div>
            <div className="flex justify-between items-center gap-[8px] h-[24px]">
              {DetailsIcon("entryFee")}
              <p className="m-0 text-[14px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)] line-clamp-1 flex-1">
                ${dropInData.entryFee}
              </p>
            </div>
            <div className="flex justify-between items-center gap-[8px] h-[24px]">
              {DetailsIcon("date")}
              <p className="m-0 text-[14px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)] line-clamp-1 flex-1">
                Event date {" · "} {formatDate(dropInData.date)}{" "}
                {formatTime(dropInData.time)}
              </p>
            </div>
            <div className="flex justify-between items-center gap-[8px] h-[24px]">
              {DetailsIcon("location")}
              <p className="m-0 text-[14px] font-[400] leading-[22px] tracking-[-0.25px] text-[rgb(56,53,53)] line-clamp-1 flex-1">
                {dropInData.location} ({dropInData.address})
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Margin */}
        <div className="w-full h-[172px]"></div>
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
    case "entryFee":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="18px"
          height="18px"
        >
          <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zm20-312l0 13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9l0 13.8c0 11-9 20-20 20s-20-9-20-20l0-14.6c-10.3-2.2-20-5.5-28.2-8.4c0 0 0 0 0 0s0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c0 0 0 0 0 0c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5l0-14c0-11 9-20 20-20s20 9 20 20z" />
        </svg>
      );
    case "date":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="18px"
          height="18px"
        >
          <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z" />
        </svg>
      );
    case "location":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          width="18px"
          height="18px"
        >
          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </svg>
      );

    default:
      return null;
  }
};
