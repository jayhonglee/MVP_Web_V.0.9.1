import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
// @ts-expect-error Missing type definitions for CSS import
import "swiper/css";
import dropInsData from "../data/dropIns.json";
import { createRootRoute } from "@tanstack/react-router";
import NavBar from "../components/NavBar";

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

// Helper functions for date and time formatting
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    date.getDay()
  ];
  return `${month}.${day}(${dayOfWeek})`;
};

const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${ampm} ${hour12}:${minutes}`;
};

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const swiperRef = useRef<{ swiper: SwiperType } | null>(null);
  const categoryListRef = useRef<HTMLUListElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categories = Object.keys(dropInsData as DropInsData);

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

  return (
    <div>
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <div className="w-full h-[325px] flex flex-col items-center justify-center mobile:h-[496px]">
        <h1 className="text-[18px] font-bold flex items-center mb-[20px] text-[#f43630] tracking-tight leading-[28px] mobile:font-[700] mobile:text-[24px] mobile:leading-[30px]">
          <img
            src="/drop-in.svg"
            alt="Drop-In Icon"
            className="w-[13.5px] h-[13.5px] mr-[7px] mobile:w-[24px] mobile:h-[24px] mobile:mr-[7px]"
          />
          Drop-In
        </h1>
        <h1 className="text-[28px] leading-[42px] font-[700] text-center uppercase mb-[32px] tracking-tighter mobile:text-[44px] mobile:leading-[60px]">
          one-day gathering
          <br />
          to brighten your day
        </h1>
        <p className="text-[16px] leading-[24px] font-[400] text-center tracking-tighter mobile:text-[22px] mobile:leading-[32px]">
          A one-day gathering anyone can host and join, <br />
          drop in for a fun and casual meetup!
        </p>
      </div>

      {/* Drop-In Categories Section */}
      <ul
        ref={categoryListRef}
        className="h-[46px] mobile:h-[78px] w-full flex mobile:justify-center justify-start items-center px-[8px] bg-[#fefefe] whitespace-nowrap overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
            <div className="flex flex-col items-center w-full px-[14px]">
              <div className="flex flex-col mobile:grid mobile:grid-cols-2 gap-[16px] py-4">
                {(dropInsData as DropInsData)[category].map((dropIn) => (
                  <div
                    key={dropIn.id}
                    className="bg-[#fefefe] rounded-[12px] px-[10px] py-[12px] min-w-[344px] max-w-[400px] w-full mx-auto"
                  >
                    <div className="flex items-center">
                      <img
                        src={`${dropIn.dropInImage}?auto=compress&q=60&w=196&fit=crop`}
                        alt={dropIn.title}
                        className="object-cover rounded-[10px] mr-[10px] relative w-[98px] h-[98px] flex-shrink-0"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98' height='98' viewBox='0 0 98 98'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B'/%3E%3Cstop offset='100%25' style='stop-color:%23FF8E53'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='98' height='98' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='bold' fill='white'%3EHANGOUT%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="flex flex-col min-w-0 flex-1 h-[98px] justify-between">
                        <div className="flex flex-col">
                          <div className="flex overflow-x-hidden mb-[5px]">
                            {dropIn.interestTags
                              .slice(0, 2)
                              .map((tag, index) => (
                                <div
                                  key={index}
                                  className="bg-[#f4f4f4] text-[#666060] flex justify-center items-center font-semibold text-[11px] leading-[11px] text-center px-2 py-1 tracking-[-0.2px] rounded-[10px] mr-1.5 mb-1 uppercase overflow-hidden text-ellipsis whitespace-nowrap"
                                >
                                  {tag}
                                </div>
                              ))}
                            {dropIn.interestTags.length > 2 && (
                              <div className="bg-[#f4f4f4] text-[#666060] flex justify-center items-center font-semibold text-[11px] leading-[11px] text-center px-2 py-1 tracking-[-0.2px] rounded-[10px] mr-1.5 mb-1">
                                +{dropIn.interestTags.length - 2}
                              </div>
                            )}
                          </div>
                          <div className="font-semibold text-[15px] leading-[20px] tracking-[-0.4px] text-[rgb(56,53,53)] truncate overflow-hidden text-ellipsis whitespace-nowrap mb-[4px]">
                            {dropIn.title}
                          </div>
                          <div className="font-normal text-[12px] leading-[14.4px] tracking-[-0.2px] text-[rgb(153,150,150)] flex min-w-0 mb-[10px] w-full max-w-[216px]">
                            <div className="truncate overflow-hidden text-ellipsis whitespace-nowrap w-full tracking-[-1px]">
                              {dropIn.category}
                              {" · "}
                              <img
                                src="/info_place_14px.svg"
                                alt="location"
                                className="w-[12px] h-[12px] mobile:w-[20px] mobile:h-[20px] inline-block"
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
                                src={`${person.avatar}?auto=compress&q=50&w=44&fit=crop`}
                                alt={person.name}
                                className="object-cover rounded-full relative flex-shrink-0 w-[22px] h-[22px] -ml-1.5 first:ml-0 border border-white"
                                style={{ zIndex: index }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/avatar-default.svg";
                                }}
                              />
                            ))}
                          {dropIn.attendingPeople.length > 6 && (
                            <div
                              className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[#f4f4f4] flex items-center justify-center text-[10px] font-medium text-[#666060] -ml-1.5 border border-white"
                              style={{ zIndex: 6 }}
                            >
                              +{dropIn.attendingPeople.length - 6}
                            </div>
                          )}

                          <span className="ml-[4.7px] flex justify-center items-center font-normal text-[10px] leading-[12px] tracking-[-0.4px] text-[rgb(153,150,150)]">
                            <img
                              src="/ic_info_person_14px.svg"
                              alt="people"
                              className="w-[10px] h-[10px] mobile:w-[16px] mobile:h-[16px] mr-[2px]"
                            />{" "}
                            {dropIn.attendees}/{dropIn.maxAttendees}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const Route = createRootRoute({
  component: HomePage,
});
