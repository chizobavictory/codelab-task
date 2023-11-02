import logo from "../assets/react.svg";
import notifications from "../assets/notifications.svg";
import chat from "../assets/chat.svg";
import menu from "../assets/menu.svg";
import avi from "../assets/avi.svg";
import { useState } from "react";

const Navbar = () => {
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);

  const toggleUserDropdown = () => {
    setUserDropdownVisible(!userDropdownVisible);
  };

  return (
    <div className="sticky top-0 bg-white">
      <div className="px-4 pt-4">
        <div className="relative">
          <div className="flex justify-between shadow border-2 border-white rounded-full  p-2 h-16 items-center">
            <div className="p-4">
              <img src={logo} alt="Mainstack Logo" className="w-10 h-10" />
            </div>

            <div className="justify-center items-center flex gap-5">
              <h2 className="text-2xl font-[degularsemibold] text-neutral-900">React Task</h2>
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
