import React from "react";
import PlantCard from "./PlantCard";
import JP1 from "../../assets/JP1.jpg";

const PlantGrid: React.FC = () => {
  const plants = [
    {
      title: "Crassula small leaf plant",
      imageUrl: JP1,
    },
    {
      title: "Lemon",
      imageUrl: JP1,
    },
    {
      title: "Mint",
      imageUrl: JP1,
    },
  ];

  return (
    <div className="flex justify-between pl-12 gap-8">
      {plants.map((plant) => (
        <PlantCard
          key={plant.title}
          title={plant.title}
          imageUrl={plant.imageUrl}
        />
      ))}
    </div>
  );
};

export default PlantGrid;
