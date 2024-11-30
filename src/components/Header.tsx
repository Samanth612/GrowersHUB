import React, { ReactNode, useState } from "react";
import logo from "../assets/FooterLogo.png";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface WrapperProps {
  children?: ReactNode;
}

const Header: React.FC<WrapperProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const AuthReducer = useSelector((state: any) => state.auth);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navItems = ["Products", "Community", "About", "Help"];

  return (
    <div>
      <header className="flex items-center justify-between px-6 lg:px-20 py-4 bg-white">
        <div className="flex items-center gap-16">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="cursor-pointer flex-shrink-0"
          >
            <img src={logo} alt="Logo" className="h-16 -ml-1" />
          </div>
          <nav className="hidden xl:flex">
            <ul className="flex items-center gap-14">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={item.toLocaleLowerCase()}
                    className="text-secondary font-normal hover:text-gray-900"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="items-center gap-6 hidden xl:flex">
          <div className="flex items-center justify-center px-6 py-0 border-2 rounded-[10px] border-[#EDEDED]  gap-6">
            <div className="flex flex-col items-start text-teritary">
              <span>04 August 2024</span>
              <span className="flex items-center gap-1">
                <svg
                  width="14"
                  height="15"
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
                <span className="text-secondary text-xl font-medium">
                  California,
                </span>
              </span>
            </div>
            <span className="font-semibold text-2xl">18°C</span>
          </div>
          <button
            className={`${
              !AuthReducer ? "px-11" : "px-6"
            } py-3 font-medium text-black border-2 border-secondary rounded-lg hover:bg-gray-50`}
            onClick={() => {
              navigate("/login");
            }}
          >
            {!AuthReducer ? "Login" : "Create Album"}
          </button>
          <button
            className="px-6 py-3 text-white bg-primary font-medium rounded-lg hover:bg-green-500"
            onClick={openModal}
          >
            Become a Seller
          </button>
        </div>
        {isModalOpen && <Modal onClose={closeModal} />}
      </header>
      {children}
    </div>
  );
};

export default Header;
