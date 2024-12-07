import React from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CREATEALBUM, LOGIN } from "../Utilities/constantLinks";

interface SidebarMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const menuList = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Community", link: "/community" },
    { name: "About", link: "/about" },
    { name: "Help", link: "/help" },
  ];
  const AuthReducer = useSelector((state: any) => state.auth);

  return (
    <div
      className={`absolute z-20 top-0 right-0 h-full py-12 w-80 bg-white shadow-lg ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsOpen(false)}
          className="text-xl font-bold text-gray-800"
        >
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-4 px-6 mb-28">
        {menuList.map((item, index) => (
          <a href={item?.link} key={index} className="text-secondary text-xl">
            {item?.name}
          </a>
        ))}
      </nav>

      {/* Buttons */}
      <div className="mt-8 px-6">
        <button
          className="w-full py-2 font-medium border border-secondary rounded-md text-secondary hover:bg-gray-100"
          onClick={() => {
            if (!AuthReducer) {
              navigate(LOGIN);
            } else {
              navigate(CREATEALBUM);
            }
          }}
        >
          {!AuthReducer ? "Login" : "Create Album"}
        </button>
        <button className="w-full mt-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-green-500">
          Become a Seller
        </button>
        <div className="flex items-center justify-between px-6 py-2 mt-6 border-2 rounded-[10px] border-[#EDEDED]  gap-6">
          <div className="flex flex-col items-start text-teritary">
            <span className="text-xs whitespace-nowrap">04 August 2024</span>
            <span className="flex items-center gap-1">
              <svg
                width="12"
                height="13"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.62404 4.5C2.62404 3.18832 3.68736 2.125 4.99904 2.125C6.31071 2.125 7.37404 3.18832 7.37404 4.5C7.37404 5.81168 6.31071 6.875 4.99904 6.875C3.68736 6.875 2.62404 5.81168 2.62404 4.5ZM4.99904 2.875C4.10157 2.875 3.37404 3.60254 3.37404 4.5C3.37404 5.39746 4.10157 6.125 4.99904 6.125C5.8965 6.125 6.62404 5.39746 6.62404 4.5C6.62404 3.60254 5.8965 2.875 4.99904 2.875Z"
                  fill="#212529"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.761218 3.92843C0.938381 1.77912 2.73446 0.125 4.89105 0.125H5.10702C7.26362 0.125 9.05969 1.77912 9.23685 3.92843C9.33202 5.083 8.97538 6.22945 8.24206 7.12629L5.84552 10.0572C5.40802 10.5922 4.59005 10.5922 4.15255 10.0572L1.75602 7.12629C1.02269 6.22945 0.666048 5.083 0.761218 3.92843ZM4.89105 0.875C3.12478 0.875 1.65378 2.22974 1.50868 3.99004C1.42948 4.95096 1.7263 5.90512 2.33663 6.65154L4.73316 9.58243C4.87058 9.75048 5.1275 9.75048 5.26491 9.58243L7.66144 6.65153C8.27178 5.90512 8.5686 4.95096 8.48939 3.99004C8.34429 2.22974 6.87329 0.875 5.10702 0.875H4.89105Z"
                  fill="#212529"
                />
              </svg>
              <span className="text-secondary text-sm xl:text-xl font-medium">
                California,
              </span>
            </span>
          </div>
          <span className="font-semibold text-2xl">18°C</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
