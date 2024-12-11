import React, { useState } from "react";
import heroPlant from "../assets/HeroPlant.png";
import Modal from "./Modal";
import JoinWaitList from "./JoinWaitList";

const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="relative flex flex-col items-start justify-center w-full py-5 h-[100vh]">
        {/* Left half - Image */}
        <div className="z-10 flex flex-col items-start justify-center space-y-6 w-[55%] ml-14 xll:ml-28">
          <h1 className="text-4xl leading-relaxed xll:text-6xl xll:leading-relaxed font-jost font-bold text-secondary">
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

        <div className="z-10 mt-8 flex flex-col items-center gap-4 justify-center ml-12 xll:ml-28 sm:flex-row">
          <button
            type="button"
            className="px-12 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-green-500 transition-colors"
          >
            Start Shopping
          </button>
          <button
            type="button"
            className="px-12 py-3 text-lg font-medium border border-secondary text-secondary bg-white rounded-lg transition-colors"
            onClick={openModal}
          >
            Join the Waitlist
          </button>
        </div>
      </section>
      {isModalOpen && (
        <Modal children={<JoinWaitList onClose={closeModal} />} />
      )}
    </>
  );
};

export default HeroSection;
