import React, { useState } from "react";
import JP1 from "../assets/JP1.jpg";
import JP2 from "../assets/JP2.jpg";
import JP3 from "../assets/JP3.jpg";
import JP4 from "../assets/JP4.jpg";
import Modal from "./Modal";

const stages = [
  {
    img: JP1,
    title: "New to Gardening?",
    description: "Tips, getting started guides.",
  },
  {
    img: JP2,
    title: "Experienced Growers",
    description: "Advanced techniques, troubleshooting.",
  },
  {
    img: JP3,
    title: "Sustainable Practices",
    description: "Eco-friendly gardening, composting, and water conservation.",
  },
  {
    img: JP4,
    title: "Community",
    description: "Connect with like minded people and share your thoughts.",
  },
];

const JourneySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="max-w-full mx-6 md:mx-20 px-4 py-12">
        {/* Heading Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold text-secondary mb-6 leading-snug md:leading-normal lg:leading-relaxed">
            Your Journey from
            <br />
            <span>Seed to Harvest</span>
          </h1>
          <p className="text-teritary text-lg md:text-xl leading-relaxed max-w-4xl">
            Ready to start your own organic home-grown produce journey? Whether
            you're new to gardening or unsure where to begin, Growers Hub
            connects you with experienced local growers who will help you build
            your first planter and get growing!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stages.map((stage, index) => (
            <div key={index} className="flex flex-col">
              <div className="aspect-square overflow-hidden rounded-2xl mb-4">
                <img
                  src={stage.img}
                  alt={stage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {stage.title}
              </h3>
              <p className="text-teritary">{stage.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="bg-primary text-white px-8 py-3 rounded-md hover:bg-green-500 transition-colors text-lg font-medium"
          onClick={openModal}
        >
          Join Waitlist
        </button>
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
};

export default JourneySection;
