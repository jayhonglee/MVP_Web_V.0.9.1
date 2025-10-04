import React, { useState, useRef, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
// import dropInsData from "../mock/dropIns.json";
import { formatDate, formatTime } from "../utils/dateUtils";
import { useGetHangoutsHome } from "../hooks/hangout/useGetHangoutsHome";

// @ts-expect-error Missing type definitions for CSS import
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// Types for the dropIns data
interface Person {
  name: string;
  avatar: string;
}

interface DropIn {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  host: Person;
  attendees: number;
  maxAttendees: number;
  description: string;
  interestTags: string[];
  dropInImage: string;
  attendingPeople: Person[];
}

interface DropInsData {
  [category: string]: DropIn[];
}

const Index: React.FC = () => {
  const { hangouts: dropInsData, isLoading, error } = useGetHangoutsHome();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const swiperRef = useRef<{ swiper: SwiperType } | null>(null);
  const categoryListRef = useRef<HTMLUListElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Safe categories extraction
  // const categories = dropInsData
  //   ? Object.keys(dropInsData as DropInsData).sort()
  //   : [];
  const categories = [
    "All",
    "🎨 Art & Crafting",
    "📚 Books & Study",
    "🎤 Club Activities",
    "🍽️ Food & Drinks",
    "🎮 Gaming",
    "💬 Local Chat",
    "🎉 Party",
    "⚽ Sports",
    "🏕️ Travel & Outdoor",
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!categoryListRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - categoryListRef.current.offsetLeft);
    setScrollLeft(categoryListRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !categoryListRef.current) return;
    const x = e.touches[0].pageX - categoryListRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    categoryListRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollCategoryIntoView = (category: string): void => {
    if (categoryListRef.current) {
      const categoryElement = categoryListRef.current.querySelector(
        `[data-category="${category}"]`
      );
      if (categoryElement) {
        categoryElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleSlideChange = (swiper: SwiperType): void => {
    const newCategory = categories[swiper.activeIndex];
    setSelectedCategory(newCategory);
    scrollCategoryIntoView(newCategory);
  };

  const handleCategoryClick = (category: string): void => {
    const index = categories.indexOf(category);
    setSelectedCategory(category);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
    scrollCategoryIntoView(category);
  };

  // Initial scroll to selected category
  useEffect(() => {
    scrollCategoryIntoView(selectedCategory);
  }, [selectedCategory]);

  // Loading and error states
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F43630]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#F43630] text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <NavBar currentPage="Drop-In" />

      {/* Hero Section */}
      <div className="w-full h-[325px] flex flex-col items-center justify-center mobile:h-[496px]">
        <h1 className="text-[18px] font-bold flex items-center mb-[20px] text-[#f43630] tracking-tight leading-[28px] mobile:font-[700] mobile:text-[24px] mobile:leading-[30px]">
          <img
            src="/drop-in.svg"
            alt="Drop-In Icon"
            className="w-[13.5px] h-[13.5px] mr-[7px] mobile:w-[24px] mobile:h-[24px] mobile:mr-[7px]"
          />
          SFU
        </h1>
        <h1 className="text-[28px] leading-[42px] font-[700] text-center uppercase mb-[32px] tracking-tighter mobile:text-[44px] mobile:leading-[60px]">
          <span className="line-through">Boring campus</span>
          <br />
          exciting campus
        </h1>
        <p className="text-[16px] leading-[24px] font-[400] text-center tracking-tighter mobile:text-[22px] mobile:leading-[32px]">
          Make friends doing what you love, <br />
          easily host or join a fun casual hangout!
        </p>
      </div>

      {/* Drop-In Categories Section */}
      <ul
        ref={categoryListRef}
        className="h-[46px] mobile:h-[82px] w-full flex mobile:justify-center justify-start items-center px-[8px] bg-[#fefefe] whitespace-nowrap overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sticky top-[64px] mobile:top-[80px] z-50"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {categories.map((category) => (
          <li
            key={category}
            data-category={category}
            onClick={() => handleCategoryClick(category)}
            className={`text-[16px] font-[600] min-w-[46px] h-[42px] mobile:h-[78px] border-b-2 text-[rgb(56,53,53)] mobile:text-[20px] ${
              selectedCategory === category
                ? "border-[rgb(56,53,53)]"
                : "border-transparent"
            } mb-[-2px] mobile:mb-0 mr-[24.33px] flex items-center justify-center shrink-0 cursor-pointer`}
          >
            {category}
          </li>
        ))}
      </ul>

      {/* Drop-Ins List Section */}
      <Swiper
        ref={swiperRef}
        className="w-full bg-[#f4f4f4]"
        onSlideChange={handleSlideChange}
        initialSlide={categories.indexOf(selectedCategory)}
        spaceBetween={80}
      >
        {categories.map((category) => (
          <SwiperSlide key={category}>
            <div className="flex flex-col items-center w-full px-[14px] mobile:px-0">
              <div
                className="flex flex-col mobile:grid mobile:grid-cols-2 gap-[16px] mobile:gap-[24px] py-4 mobile:py-[40px] mobile:w-[1166px] w-full"
                style={{
                  transform:
                    windowWidth < 372
                      ? `translateX(-${(372 - windowWidth) / 2}px)`
                      : "none",
                }}
              >
                {(dropInsData as DropInsData)?.[category]?.length > 0 ? (
                  (dropInsData as DropInsData)?.[category]?.map((dropIn) => (
                    <Link
                      to="/dropin"
                      key={dropIn.id}
                      search={{ id: dropIn.id.toString() }}
                      className="bg-[#fefefe] rounded-[12px] px-[10px] py-[12px] mobile:px-[16px] mobile:py-[20px] min-w-[344px] max-w-[400px] mobile:max-w-none mobile:w-[571px] mobile:h-[200px] w-full mx-auto hover:cursor-pointer"
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            dropIn.dropInImage?.startsWith("data:")
                              ? dropIn.dropInImage
                              : `${dropIn.dropInImage}?auto=compress&q=60&w=196&fit=crop`
                          }
                          alt={dropIn.title}
                          className="object-cover rounded-[10px] mobile:rounded-[16px] mr-[10px] mobile:mr-[16px] relative w-[98px] h-[98px] mobile:w-[160px] mobile:h-[160px] flex-shrink-0"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98' height='98' viewBox='0 0 98 98'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B'/%3E%3Cstop offset='100%25' style='stop-color:%23FF8E53'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='98' height='98' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='bold' fill='white'%3EHANGOUT%3C/text%3E%3C/svg%3E";
                          }}
                        />
                        <div className="flex flex-col min-w-0 flex-1 h-[98px] mobile:h-[160px] justify-between">
                          <div className="flex flex-col">
                            <div className="flex overflow-x-hidden mb-[5px]">
                              {dropIn.interestTags
                                .slice(0, 2)
                                .map((tag, index) => (
                                  <div
                                    key={index}
                                    className="bg-[#f4f4f4] text-[#666060] flex justify-center items-center font-semibold text-[11px] mobile:text-[18px] leading-[11px] text-center px-2 py-1 mobile:px-[13px] mobile:py-[8px] tracking-[-0.2px] rounded-[10px] uppercase overflow-hidden text-ellipsis whitespace-nowrap mobile:h-[35px] mobile:rounded-[16px] mr-[6px]"
                                  >
                                    {tag}
                                  </div>
                                ))}
                              {dropIn.interestTags.length > 2 && (
                                <div className="bg-[#f4f4f4] text-[#666060] flex justify-center items-center font-semibold text-[11px] leading-[11px] text-center px-2 py-1 tracking-[-0.2px] rounded-[10px] mobile:rounded-[16px]">
                                  +{dropIn.interestTags.length - 2}
                                </div>
                              )}
                            </div>
                            <div className="font-semibold text-[15px] mobile:text-[24px] leading-[24px] tracking-[-0.4px] text-[rgb(56,53,53)] truncate overflow-hidden text-ellipsis whitespace-nowrap mb-[4px] mobile:leading-[40px]">
                              {dropIn.title}
                            </div>
                            <div className="font-normal text-[12px] mobile:text-[20px] leading-[14px] tracking-[-0.2px] text-[rgb(153,150,150)] flex min-w-0 mb-[8px] mobile:mb-[12px] w-full max-w-[216px] mobile:max-w-[363px] mobile:leading-[24px] ">
                              <div className="truncate overflow-hidden text-ellipsis whitespace-nowrap w-full tracking-[-1px]">
                                <img
                                  src="/info_place_14px.svg"
                                  alt="location"
                                  className="w-[12px] h-[12px] mobile:w-[20px] mobile:h-[20px] inline-block mx-[-2px]"
                                />{" "}
                                {dropIn.location}
                                {" · "}
                                {formatDate(dropIn.date)}
                                {" · "}
                                {formatTime(dropIn.time)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center mb-0">
                            {dropIn.attendingPeople
                              .slice(0, 6)
                              .map((person, index) => (
                                <img
                                  key={index}
                                  src={
                                    person.avatar?.startsWith("data:")
                                      ? person.avatar
                                      : `${person.avatar}?auto=compress&q=50&w=44&fit=crop`
                                  }
                                  alt={person.name}
                                  className="object-cover rounded-full relative flex-shrink-0 w-[24px] h-[24px] mobile:w-[44px] mobile:h-[44px] -ml-1.5 first:ml-0 border mobile:border-4 border-[#fefefe]"
                                  style={{ zIndex: index }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/avatar-default.svg";
                                  }}
                                />
                              ))}
                            {dropIn.attendingPeople.length > 6 && (
                              <div
                                className="flex-shrink-0 w-[22px] h-[22px] mobile:w-[36px] mobile:h-[36px] rounded-full bg-[#f4f4f4] flex items-center justify-center text-[10px] font-medium text-[#666060] -ml-1.5 border mobile:border-4 border-[#fefefe]"
                                style={{ zIndex: 6 }}
                              >
                                +{dropIn.attendingPeople.length - 6}
                              </div>
                            )}

                            <span className="ml-[4.7px] flex justify-center items-center font-normal text-[10px] mobile:text-[16px] leading-[12px] tracking-[-0.4px] text-[rgb(153,150,150)]">
                              <img
                                src="/ic_info_person_14px.svg"
                                alt="people"
                                className="w-[10px] h-[10px] mobile:w-[16px] mobile:h-[16px] mr-[2px]"
                              />{" "}
                              {dropIn.attendees}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="flex-col justify-center items-center h-full  rounded-[12px] px-[10px] py-[12px] mobile:px-[16px] mobile:py-[20px] min-w-[344px] max-w-[400px] mobile:max-w-none mobile:w-[571px] mobile:h-[200px] w-full mx-auto hover:cursor-pointer">
                    <span className="text-[80px] flex justify-center align-center">
                      🌟
                    </span>
                    <p className="text-[16px] font-bold text-[#666060] text-center">
                      Be the first! Start a hangout here and make new friends
                      today!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: () => ({}),
});
