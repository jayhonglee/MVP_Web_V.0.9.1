import "swiper/css";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../../components/navBar/NavBar";
import dropInIcon from "../../assets/drop-in.svg";
import dropInsData from "./mock/dropIns.json";

// Helper functions for date and time formatting
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    date.getDay()
  ];
  return `${month}.${day}(${dayOfWeek})`;
};

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${ampm} ${hour12}:${minutes}`;
};

function DropInsBrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const swiperRef = useRef(null);
  const categoryListRef = useRef(null);
  const categories = Object.keys(dropInsData);

  const scrollCategoryIntoView = (category) => {
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

  const handleSlideChange = (swiper) => {
    const newCategory = categories[swiper.activeIndex];
    setSelectedCategory(newCategory);
    scrollCategoryIntoView(newCategory);
  };

  const handleCategoryClick = (category) => {
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
      <Navbar />

      {/* Hero Section */}
      <div className="w-full h-[325px] flex flex-col items-center justify-center mobile:h-[496px]">
        <h1 className="text-[18px] font-bold flex items-center mb-[20px] text-[#f43630] tracking-tight leading-[28px] mobile:font-[700] mobile:text-[24px] mobile:leading-[30px]">
          <img
            src={dropInIcon}
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
        className="h-[46px] w-full flex items-center px-[8px] bg-[#fefefe] whitespace-nowrap overflow-x-auto no-scrollbar"
      >
        {categories.map((category) => (
          <li
            key={category}
            data-category={category}
            onClick={() => handleCategoryClick(category)}
            className={`text-[16px] font-[600] min-w-[46px] h-[42px] border-b-2 text-[rgb(56,53,53)] ${
              selectedCategory === category
                ? "border-[rgb(56,53,53)]"
                : "border-transparent"
            } mb-[-2px] mr-[24.33px] flex items-center justify-center shrink-0 cursor-pointer`}
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
      >
        {categories.map((category) => (
          <SwiperSlide key={category}>
            <div className="px-[14px] grid grid-cols-1 mobile:grid-cols-2 gap-4 py-4">
              {dropInsData[category].map((dropIn) => (
                <div
                  key={dropIn.id}
                  className="bg-[#fefefe] rounded-[12px] px-[10px] py-[12px]"
                >
                  <div className="flex items-center">
                    <img
                      src={dropIn.dropInImage}
                      alt={dropIn.title}
                      className="object-cover rounded-[10px] mr-[10px] relative w-[98px] h-[98px]"
                    />
                    <div className="flex flex-col w-[215px]">
                      <div className="flex overflow-x-hidden">
                        {dropIn.interestTags.map(
                          (tag, index) =>
                            index <= 1 && (
                              <div
                                key={index}
                                className="inline-block bg-[#f4f4f4] text-[#666060] flex justify-center items-center font-semibold text-[11px] leading-[11px] text-center px-2 py-1 tracking-[-0.2px] rounded-[10px] mr-1.5 mb-1"
                              >
                                {tag}
                              </div>
                            )
                        )}
                      </div>
                      <div className="font-semibold text-[15px] leading-[24px] tracking-[-0.4px] text-[rgb(56,53,53)] truncate mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        {dropIn.title}
                      </div>
                      <div className="font-normal text-[12px] leading-[14.4px] tracking-[-0.2px] text-[rgb(153,150,150)] flex truncate mb-[10px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {dropIn.category} 📍 {dropIn.location} ·{" "}
                        {formatDate(dropIn.date)} · {formatTime(dropIn.time)}
                      </div>
                      <div className="flex items-center">
                        {dropIn.attendingPeople
                          .slice(0, 6)
                          .map((person, index) => (
                            <img
                              key={index}
                              src={person.avatar}
                              alt={person.name}
                              className="object-cover rounded-full relative flex-shrink-0 w-[22px] h-[22px] -ml-1.5 first:ml-0 border border-white"
                              style={{ zIndex: index }}
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
                          👥 {dropIn.attendees}/{dropIn.maxAttendees}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center"></div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default DropInsBrowsePage;
