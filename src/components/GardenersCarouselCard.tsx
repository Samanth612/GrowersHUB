import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CarouselCard from "../Utilities/CarouselCard";
import GardenersCard from "./GardenersCard";

interface Product {
  title: string;
  location: string;
  price: string | number;
  unitInfo?: string;
  stock?: string;
  image: string;
  profileImage: string;
  products: { image: string }[];
  name: string;
}

interface CarouselProps {
  products: Product[];
  setSelectedAlbum: any;
}

const GardenersCarouselCard: React.FC<CarouselProps> = ({
  products,
  setSelectedAlbum,
}) => {
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
    <div className="h-auto xl:hidden mt-14">
      <div className="relative h-full w-full overflow-hidden">
        {/* Slides */}
        <div
          className="flex h-full w-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {products.map((product, index) => (
            <div
              className="w-full flex-shrink-0 flex items-center justify-center"
              key={index}
            >
              <GardenersCard {...product} setSelectedAlbum={setSelectedAlbum} />
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        {/* <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 space-x-3">
          {products.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full ${
                activeIndex === index ? "bg-white" : "bg-white/50"
              } dark:bg-gray-800/50 dark:hover:bg-gray-800`}
              onClick={() => handleControlClick(index)}
            />
          ))}
        </div> */}

        {/* Previous Button */}
        <div className="absolute left-0 top-0 flex h-full items-center justify-center px-4">
          <button
            onClick={() =>
              handleControlClick((activeIndex - 1 + totalSlides) % totalSlides)
            }
            className={`p-4 rounded-full ${
              activeIndex === 0
                ? "bg-teritary text-white cursor-not-allowed"
                : "bg-primary hover:bg-green-500 text-white"
            }`}
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Next Button */}
        <div className="absolute right-0 top-0 flex h-full items-center justify-center px-4">
          <button
            onClick={() => handleControlClick((activeIndex + 1) % totalSlides)}
            className={`p-4 rounded-full ${
              activeIndex === totalSlides - 1
                ? "bg-teritary text-white cursor-not-allowed"
                : "bg-primary hover:bg-green-500 text-white"
            }`}
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GardenersCarouselCard;
