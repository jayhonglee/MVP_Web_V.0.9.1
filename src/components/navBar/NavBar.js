// import logo from "../../assets/logo.png";
import appStoreIcon from "../../assets/app-store.svg";

function NavBar() {
  return (
    <div className="relative">
      {/* Default Navbar Placeholder*/}
      <div className="w-full h-[4rem] mobile:h-[79px] bg-transparent mobile:flex" />

      {/* Mobile Navbar */}
      <div className="bg-white fixed top-0 left-0 right-0 w-full h-[4rem] px-[14px] py-[17px] flex justify-between shadow-sm mobile:hidden items-center">
        <a href="/">
          {/* <img src={logo} alt="logo" className="h-full w-auto" /> */}
          <a href="/" className="text-lg font-medium tracking-wider">
            HANGOUT
          </a>
        </a>
        <div className="flex items-center mr-[6px]">
          <div className="mr-[20px] bg-[#F43630] rounded-full px-[10px] py-[5px]">
            <p className="text-sm text-white font-medium flex items-center">
              <img
                src={appStoreIcon}
                alt="App Store"
                className="w-5 h-5 mr-1"
              />
              Coming Soon
            </p>
          </div>
          <div className="w-[16px] h-[14px] flex flex-col justify-between">
            <span className="w-full h-[2px] bg-[#383535]"></span>
            <span className="w-full h-[2px] bg-[#383535]"></span>
            <span className="w-full h-[2px] bg-[#383535]"></span>
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="fixed top-0 left-0 right-0 w-full h-[79px] bg-[#e6e1e1] hidden mobile:flex z-50 shadow-sm">
        <div className="w-[1253px] h-[74.4px] mx-auto pt-[28.4px] px-[14px] pb-[17px] flex justify-center items-center">
          <a href="/" className="text-2xl font-medium tracking-wider">
            HANGOUT
          </a>
          <div className="w-[1055px] h-full flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="font-[500] text-[18px] ms-[40px]">
                Drop-In
              </a>
              <a href="/" className="font-[500] text-[18px] ms-[40px]">
                Group Chat
              </a>
              <a href="/" className="font-[500] text-[18px] ms-[40px]">
                Profile
              </a>
              <a href="/" className="font-[500] text-[18px] ms-[40px]">
                Create / Edit Drop-In
              </a>
            </div>
            <div>
              <div className="bg-[#F43630] rounded-full px-[15px] py-[5px]">
                <p className="text-sm text-white font-medium flex items-center">
                  <img
                    src={appStoreIcon}
                    alt="App Store"
                    className="w-5 h-5 mr-1"
                  />
                  App Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
