import React from "react";
import JP1 from "../assets/JP1.jpg";

const ViewAllCards: React.FC = () => {
  const products = [
    {
      title: "Crassula small leaf plant",
      image: JP1,
    },
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
      </div>
    </div>
  );
};

export default ViewAllCards;
