import React from "react";
import Icons from "../Utilities/Icons";

interface PROPS {
  header?: any;
  subtext: any;
  className?: any;
  variant?: any;
}

const NoPage: React.FC<PROPS> = ({ header, subtext, className, variant }) => {
  return (
    <div className="flex justify-center h-full">
      <div
        className={`${
          className ? className : ""
        } flex flex-col items-center justify-center gap-2`}
      >
        <Icons variant={variant} />
        <div className="w-64 text-2xl font-bold !font-rajdhani text-center whitespace-nowrap">
          {header}
        </div>
        <div className="text-center text-[#747688] w-[300px] whitespace-nowrap">
          {subtext}
        </div>
      </div>
    </div>
  );
};

export default NoPage;
