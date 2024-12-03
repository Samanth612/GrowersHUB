import React, { useEffect, useState } from "react";
import { Share2, Heart, MapPin } from "lucide-react";
import JP1 from "../assets/JP1.jpg";
import Icons from "./Icons";
import SG1 from "../assets/SG1.jpg";

interface ProductCardProps {
  title: string;
  location: string;
  price: string | number;
  unitInfo?: string;
  stock?: string;
  image: string;
}

const CarouselCard: React.FC<ProductCardProps> = ({
  title,
  location,
  price,
  unitInfo,
  stock,
  image,
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
    <div className="relative w-full max-w-96 rounded-lg overflow-hidden bg-white shadow-md">
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden">
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

        {/* Super Grower Badge */}
        <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Icons variant="PriceBadge" />
              <span className="text-xl font-medium">${price}</span>
              {unitInfo && <span className="text-teritary">/{unitInfo}</span>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 w-72 truncate">{title}</h3>
        <div className="flex items-center gap-1 text-teritary mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Price Badge */}

        <div className="flex items-center gap-1 mt-2">
          <img
            src={SG1}
            alt={"Gardener"}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex gap-0.5">
            <span className="text-xl font-medium whitespace-nowrap">
              {"Joanna Wellick"}
            </span>
            <div className="flex bg-premiumgreen px-2 py-1 rounded-lg ml-2">
              <div className="flex items-center gap-2 whitespace-nowrap">
                {/* <div className="w-2 h-2 bg-green-600 rounded-full" /> */}
                <Icons variant="SuperGrow" />
                <span className="text-sm text-primary font-medium">
                  Super Grower
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
