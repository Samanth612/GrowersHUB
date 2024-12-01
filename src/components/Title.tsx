import React from "react";

interface TitleProps {
  title: string;
  description: string;
}
const Title: React.FC<TitleProps> = ({ title, description }) => {
  return (
    <header className="flex items-center justify-start w-full h-[150px] tabmd:h-[184px] bg-premiumgray">
      <div className="flex items-center max-w-7xl px-4 sm:px-6 lg:px-28">
        <div className="flex flex-col items-center gap-5 h-16 tabmd:flex-row">
          <h1 className="text-5xl tabmd:text-6xl font-extrabold text-secondary">
            {title}
          </h1>
          <div className="mx-6 h-10 w-px bg-black hidden tabmd:block" />
          <p className="font-normal text-lg tabmd:text-xl text-black">
            {description}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Title;
