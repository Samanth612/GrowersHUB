import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/FooterLogo.png";
import { ABOUTUS, TERMS } from "../Utilities/constantLinks";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <footer className="max-w-full px-5 md:px-12 py-12 bg-premiumgray">
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between items-center h-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img className="h-16 -ml-1" src={logo} alt="Growers Hub Logo" />
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 order-2 lg:order-1 items-center justify-center gap-8">
          <a
            href="#"
            className="text-secondary hover:text-gray-900 flex items-center justify-center"
          >
            Products
          </a>
          <a
            href="#"
            className="text-secondary hover:text-gray-900 flex items-center justify-center"
          >
            Community
          </a>
          <a
            className="text-secondary hover:text-gray-900 flex items-center justify-center cursor-pointer"
            onClick={() => navigate(ABOUTUS)}
          >
            About
          </a>
          <a
            href="#"
            className="text-secondary hover:text-gray-900 flex items-center justify-center"
          >
            Help
          </a>
          <a
            className="text-secondary hover:text-gray-900 flex items-center justify-center cursor-pointer"
            onClick={() => navigate(TERMS)}
          >
            Privacy & Terms
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-8 space-x-6 order-1 lg:order-2">
          <a href="#" className="text-gray-700 hover:text-gray-900">
            <FaFacebookF className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            <FaTwitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            <FaInstagram className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Navbar;
