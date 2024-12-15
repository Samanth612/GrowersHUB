import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
  title: string;
  button: string;
}

const SellersModal: React.FC<ModalProps> = ({ onClose, title, button }) => {
  return (
    <>
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 text-2xl"
            >
              &times;
            </button>
            <p className="text-lg font-semibold mb-4">
              {title || "Are you sure you want to delete this Listing?"}
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={onClose}
                className="px-6 py-2 font-medium text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 font-medium border border-secondary rounded-md text-secondary"
              >
                {button || "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellersModal;
