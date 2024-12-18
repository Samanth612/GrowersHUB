import React from "react";
import JP1 from "../../assets/JP1.jpg";

interface SplitCardProps {
  image: string;
}

const SplitCard: React.FC<SplitCardProps> = ({ image }) => {
  return (
    <div className="relative w-full max-w-96 rounded-lg overflow-hidden bg-white">
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden">
          {/* Single Image Display */}
          <div className="w-full h-full">
            <img
              src={image || JP1}
              alt={"Product"}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitCard;
