import React from "react";
import heroPlant from "../assets/HeroPlant.png";

const HeroSection: React.FC = () => {
  return (
    <>
      <section className="relative flex flex-col items-start justify-center w-full py-5 h-[100vh]">
        {/* Left half - Image */}
        <div className="z-10 flex flex-col items-start justify-center space-y-6 w-[50%] ml-14 sm:ml-28">
          <h1 className="text-4xl leading-relaxed md:text-6xl md:leading-relaxed font-jost font-bold text-secondary">
            Where <span className="text-primary">Gardens</span> <br />
            Grow & Communities <br />
            Thrive
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl 2xl:w-[75%] font-jost font-medium text-teritary mt-0">
            Welcome to Growers Hub—a home for plant lovers, garden enthusiasts,
            and those inspired by nature’s gifts.
          </p>
        </div>

        {/* Right half - Text and Buttons */}
        <div className="absolute inset-0 bg-gradient-to-tr from-green-600 via-green-500 to-green-300 z-0"></div>
        <img
          src={heroPlant}
          alt="Plant"
          className="absolute h-full w-full object-cover"
        />
      </section>
    </>
  );
};

export default HeroSection;
