import "swiper/css";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../../components/navBar/NavBar";
import dropInIcon from "../../assets/drop-in.svg";
import dropInsData from "./mock/dropIns.json";

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
  });

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
                      className="w-[98px] h-[98px] rounded-[10px] mr-[10px]"
                    />
                    <div className="flex flex-col">sdfdsf</div>
                  </div>
                  {/* <div className="flex items-center mb-4">
                    <img
                      src={dropIn.host.avatar}
                      alt={dropIn.host.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="font-semibold">{dropIn.host.name}</h3>
                      <p className="text-sm text-gray-500">{dropIn.category}</p>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{dropIn.title}</h2>
                  <p className="text-gray-600 mb-4">{dropIn.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>
                      <p>📅 {dropIn.date}</p>
                      <p>⏰ {dropIn.time}</p>
                    </div>
                    <div>
                      <p>📍 {dropIn.location}</p>
                      <p>
                        👥 {dropIn.attendees}/{dropIn.maxAttendees}
                      </p>
                    </div>
                  </div> */}
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
