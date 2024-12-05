import React from "react";

interface PlantCardProps {
  title: string;
  imageUrl: string;
}

const PlantCard: React.FC<PlantCardProps> = ({ title, imageUrl }) => (
  <div className="flex flex-col w-full max-w-sm">
    <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-2">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full bg-white ${
              i === 0 ? "opacity-100" : "opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
    <h3 className="text-xl font-normal mb-4">{title}</h3>
    <div className="flex gap-4">
      <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
        Edit
      </button>
      <button className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
        Share
      </button>
    </div>
  </div>
);

export default PlantCard;
