import logo from "../../assets/logo.png";

function NavBar() {
  return (
    <div className="relative">
      {/* Mobile Navbar */}
      <div className="w-full h-[4rem] px-[14px] py-[17px] flex justify-between mobile:hidden">
        <a href="/">
          <img src={logo} alt="logo" className="h-full w-auto" />
        </a>
        <div className="flex items-center mr-[6px]">
          <div className="mr-[20px] bg-[#F43630] rounded-full px-[15px] py-[5px]">
            <p className="text-sm text-white font-medium">App Coming Soon</p>
          </div>
          <div className="w-[16px] h-[14px] flex flex-col justify-between">
            <span className="w-full h-[2px] bg-[#383535]"></span>
            <span className="w-full h-[2px] bg-[#383535]"></span>
            <span className="w-full h-[2px] bg-[#383535]"></span>
          </div>
        </div>
      </div>
      {/* Desktop Navbar */}
      <div className="fixed top-0 left-0 right-0 w-full h-[74.4px] pt-[28.4px] px-[14px] pb-[17px] flex justify-between bg-[#e6e1e1] hidden mobile:flex z-50" />
      <div className="w-full h-[74.4px] pt-[28.4px] px-[14px] pb-[17px] bg-[#e6e1e1] hidden mobile:flex" />
    </div>
  );
}

export default NavBar;
