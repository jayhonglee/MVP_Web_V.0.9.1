import Navbar from "../components/navBar/NavBar";
import dropInIcon from "../assets/drop-in.svg";

function DropInsBrowsePage() {
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
    </div>
  );
}

export default DropInsBrowsePage;
