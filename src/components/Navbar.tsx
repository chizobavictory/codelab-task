import widgets from "../assets/widgets.svg";
import logo from "../assets/mainstack-logo.svg";
import home from "../assets/home.svg";
import chart from "../assets/insert_chart.svg";
import payments from "../assets/payments.svg";
import crm from "../assets/group.svg";
// import group from "../assets/group.svg";
import notifications from "../assets/notifications.svg";
import chat from "../assets/chat.svg";
import menu from "../assets/menu.svg";
import avi from "../assets/avi.svg";
import { useState } from "react";
import expand from "../assets/expandwhite.svg";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [appsButtonClicked, setAppsButtonClicked] = useState(false);

  const [userDropdownVisible, setUserDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setAppsButtonClicked(!appsButtonClicked);
  };

  const toggleUserDropdown = () => {
    setUserDropdownVisible(!userDropdownVisible);
  };

  return (
    <div className="sticky top-0 bg-white">
      <div className="px-4 pt-4">
        <div className="relative">
          <div className="flex justify-between shadow border-2 border-white rounded-full  p-2 h-16 items-center">
            <div className="p-4">
              <img src={logo} alt="Mainstack Logo" />
            </div>

            <div className="justify-center items-center flex gap-5">
              <div className="hover:bg-gray-200 flex items-center p-2 gap-1 rounded-full text-gray-600 cursor-pointer">
                <img src={home} alt="home" />
                <p className="font-[degularsemibold] text-base">Home</p>
              </div>
              <div className="hover:bg-gray-200 flex items-center p-2 gap-1 rounded-full text-gray-600 cursor-pointer">
                <img src={chart} alt="analytics" />
                <p className="font-[degularsemibold] text-base">Analytics</p>
              </div>
              <div className="bg-neutral-900 flex items-center justify-center p-2 w-28 gap-1 rounded-full text-white cursor-pointer">
                <img src={payments} alt="revenue" />
                <p className="font-[degularsemibold] text-base">Revenue</p>
              </div>
              <div className="hover:bg-gray-200 flex items-center p-2 gap-1 rounded-full text-gray-600 cursor-pointer">
                <img src={crm} alt="crm" />
                <p className="font-[degularsemibold] text-base">CRM</p>
              </div>
              <div
                className={`flex items-center p-2 gap-1 rounded-full cursor-pointer ${appsButtonClicked ? "bg-neutral-900" : "hover:bg-gray-200"}`}
                onClick={toggleDropdown}
              >
                <img src={widgets} alt="apps" className="text-white" />
                <p className={`font-[degularsemibold] text-base ${appsButtonClicked ? "text-white" : "text-gray-600"}`}>
                  Apps{appsButtonClicked ? " | Link in Bio" : ""}
                </p>
                {appsButtonClicked && <img src={expand} alt="expand" />}
              </div>
            </div>

            <div className="justify-center items-center flex gap-2">
              <div className="p-2">
                <img src={notifications} alt="notifications" />
              </div>
              <div className="p-2">
                <img src={chat} alt="chat" />
              </div>
              <div
                className={`flex items-center p-2 gap-1 rounded-full cursor-pointer ${userDropdownVisible ? "bg-neutral-900" : "hover:bg-gray-200"}`}
                onClick={toggleUserDropdown}
              >
                <img src={avi} alt="avatar" className="rounded-full" />
                <img src={menu} alt="menu" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
