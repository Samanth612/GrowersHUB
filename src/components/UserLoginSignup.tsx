import React from "react";
import carrot from "../assets/Login/carrot.png";
import plants from "../assets/Login/plants.png";
import pots from "../assets/Login/pots.png";
import tomato from "../assets/Login/tomato.png";

const UserLoginSignup = () => {
  return (
    <div className="max-w-[40%] flex items-end w-full">
      {/* Grid Container */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Top Left - Seedlings */}
        <div className="relative h-[328px]">
          <img
            src={pots}
            alt="Seedlings in pots"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Top Right - Green plants */}
        <div className="relative h-60">
          <img
            src={plants}
            alt="Growing plants"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Bottom Left - Tomatoes */}
        <div className="relative h-60">
          <img
            src={tomato}
            alt="Fresh tomatoes"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Bottom Right - Carrots */}
        <div className="relative h-[328px] -mt-[90px]">
          <img
            src={carrot}
            alt="Fresh carrots"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default UserLoginSignup;
