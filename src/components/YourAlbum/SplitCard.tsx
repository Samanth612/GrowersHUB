import React from "react";
import JP1 from "../../assets/JP1.jpg";
import Icons from "../../Utilities/Icons";

const SplitCard: React.FC = () => {
  const products = [
    {
      title: "Crassula small leaf plant",
      image: JP1,
    },
    // You can display just one product here or keep the array as is
  ];

  return (
    <div className="relative w-full max-w-96 rounded-lg overflow-hidden bg-white">
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden">
          {/* Single Image Display */}
          <div className="w-full h-full">
            <img
              src={products[0]?.image}
              alt={products[0]?.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100">
            <Icons variant="Delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplitCard;
