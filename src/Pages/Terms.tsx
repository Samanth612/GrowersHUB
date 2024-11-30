import React from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../Utilities/Icons";
import { HOME } from "../Utilities/constantLinks";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsofService from "../components/TermsofService";

const Terms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute flex flex-col w-full font-jost pb-32 mt-16 text-justify">
        {/* Back Button */}
        <button
          className="ml-12 w-[100px] flex items-center"
          onClick={() => navigate(HOME)}
        >
          <Icons variant="backArrow" />
        </button>

        {/* Page Title */}
        <div className="p-1 mx-8 mt-4 text-2xl font-bold text-center">
          PRIVACY & TERMS OF USE
        </div>
        <div className="mx-12 mt-8 border-2 border-black border-solid md:mx-32"></div>
        <div className="mx-12 mt-8 text-center text-sm text-lightGray md:mx-32">
          <i>
            Last Updated November 18<sup>th</sup>, 2024
          </i>
        </div>

        {/* Privacy Policy Content */}
        <PrivacyPolicy />
        {/* Terms of Service Content */}
        <TermsofService />
      </div>
    </>
  );
};

export default Terms;
