// src/components/MissionSection.tsx
import React from "react";
import SeedPlant from "../assets/SeedPlant.jpg";

const MissionSection: React.FC = () => {
  return (
    <>
      <section className="realtive flex flex-col justify-center items-center bg-white max-w-full mx-6 md:mx-12 py-12 text-center">
        {/* Mission Header */}
        <div className="mb-4">
          <h2 className="text-primary font-semibold text-lg">Our Mission</h2>
        </div>

        {/* Main Heading */}
        <div className="mb-8 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-semibold leading-snug md:leading-normal lg:leading-snug">
            <span className="text-secondary">Cultivating </span>
            <span className="text-primary">Connections</span>
            <span className="text-secondary">,</span>
            <br />
            <span className="text-secondary">Growing Together</span>
          </h1>
        </div>

        {/* Mission Description */}
        <div className="w-full lg:w-[58%] mb-16">
          <p className="text-teritary text-lg md:text-xl leading-relaxed">
            At Growers Hub, we believe in sustainability and minimizing waste.
            We're convinced that when neighbors come together to share their
            surplus produce, we create a vibrant, connected ecosystem that we
            can all cherish and enjoy.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative max-w-full">
          <img
            src={SeedPlant}
            alt="Hand holding plant"
            className="w-full h-auto"
          />

          {/* Optional: Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>

          {/* Optional: Background Decorative Elements */}
          {/* <div className="absolute -z-10 w-[100%] h-full top-4 -right-4 bg-premiumgray rounded"></div>
          <div className="absolute -z-20 w-[100%] h-full top-8 -left-4 bg-premiumgray rounded"></div> */}
        </div>
      </section>
    </>
  );
};

export default MissionSection;
