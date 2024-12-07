import React, { useEffect, useState } from "react";
import JP1 from "../../assets/JP1.jpg";
import Icons from "../../Utilities/Icons";
import { CREATEALBUM } from "../../Utilities/constantLinks";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  title: string;
  setSplitCards: any;
  setCardName: any;
}

const PlantCard: React.FC<ProductCardProps> = ({
  title,
  setSplitCards,
  setCardName,
}) => {
  const products = [
    {
      title: "Crassula small leaf plant",
      image: JP1,
    },
    {
      title: "Lemon",
      image: JP1,
    },
    {
      title: "Mint",
      image: JP1,
    },
    {
      title: "Betel leaf plants",
      image: JP1,
    },
    {
      title: "Crassula small leaf plant (Repeat)",
      image: JP1,
    },
    {
      title: "Lemon (Repeat)",
      image: JP1,
    },
  ];
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false); // Track manual interactions
  const totalSlides = products.length;

  // Navigate to the next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Reset timer on manual interaction
  const handleControlClick = (newIndex: number) => {
    setActiveIndex(newIndex);
    setIsManualChange(true); // Mark as manual change
  };

  useEffect(() => {
    if (isManualChange) {
      const timeoutId = setTimeout(() => setIsManualChange(false), 5000);
      return () => clearTimeout(timeoutId);
    }

    const intervalId = setInterval(nextSlide, 5000); // Auto-scroll interval
    return () => clearInterval(intervalId);
  }, [isManualChange, totalSlides]);

  return (
    <div className="relative w-full max-w-96 rounded-lg overflow-hidden bg-white">
      <div className="relative">
        <div
          className="relative h-72 cursor-pointer w-full overflow-hidden"
          onClick={() => {
            setSplitCards(true);
            setCardName(title);
          }}
        >
          {/* Slides */}
          <div
            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {products.map((product, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3">
            {products.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  activeIndex === index ? "bg-white" : "bg-white/50"
                } `}
                onClick={() => handleControlClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100">
            <Icons variant="Delete" />
          </button>
        </div>
      </div>

      <h3
        className="text-xl font-semibold cursor-pointer mt-4 mb-4 w-72 truncate"
        onClick={() => setSplitCards(true)}
      >
        {title}
      </h3>
      <div className="flex gap-4">
        <button
          className="px-6 py-2 w-52 font-medium border border-secondary rounded-lg bg-white text-secondary text-lg"
          onClick={() => navigate(CREATEALBUM)}
        >
          Edit
        </button>
        <button className="px-6 py-2 w-52 font-medium border rounded-lg bg-primary hover:bg-green-500 text-white text-lg">
          Share
        </button>
      </div>
    </div>
  );
};

export default PlantCard;
