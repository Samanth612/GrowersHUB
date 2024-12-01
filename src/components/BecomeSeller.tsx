import React, { useState } from "react";
import Modal from "./Modal";

const BecomeSeller: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="flex flex-col items-center text-center mx-6 tabxl:mx-20 px-4 py-12 bg-white tabxl:flex-row tabxl:text-left tabxl:justify-between tabxl:items-center">
        {/* Text Section */}
        <div className="space-y-5 text-start tabxl:w-1/2">
          <h2 className="text-3xl md:text-5xl font-semibold text-secondary">
            Want to Become a Seller
          </h2>
          <p className="text-teritary font-light text-lg md:text-xl">
            Join Growers Hub and become part of a community that values nature,
            sustainability, and connection.
          </p>
        </div>

        {/* Input and Button Section */}
        <div className="flex flex-col mt-6 space-y-4 tabxl:space-y-0 tabxl:mt-0 tabxl:w-1/2 tabxl:flex-row tabxl:justify-end tabxl:space-x-4">
          <input
            placeholder="Your email"
            className="border border-teritary rounded-lg w-64 placeholder:text-secondary placeholder:font-medium px-6 py-3"
          />
          <button
            onClick={openModal}
            className="px-6 py-3 font-semibold text-white bg-primary rounded-md hover:bg-green-500"
          >
            Join the Waitlist
          </button>
        </div>
      </section>
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
};

export default BecomeSeller;
