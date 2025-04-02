import Navbar from "../components/navBar/NavBar";
import dropInIcon from "../assets/drop-in.svg";

function DropInsBrowsePage() {
  return (
    <div>
      <Navbar />
      <div className="w-full h-[325px] flex flex-col items-center justify-center">
        <h1 className="text-[18px] font-bold flex items-center mb-[20px] text-[#f43630]">
          <img
            src={dropInIcon}
            alt="Drop-In Icon"
            className="w-4 h-4 mr-[7px] tracking-tight"
          />
          Drop-In
        </h1>
        <h1 className="text-[28px] leading-[42px] font-[700] text-center uppercase mb-[32px] tracking-tighter">
          one-day gathering
          <br />
          to brighten your day
        </h1>
        <p className="text-[16px] leading-[24px] font-[400] text-center tracking-tighter">
          A one-day gathering anyone can host and join, <br />
          drop in for a fun and casual meetup!
        </p>
      </div>
    </div>
  );
}

export default DropInsBrowsePage;
