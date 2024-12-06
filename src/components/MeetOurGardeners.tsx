import React, { useState, useEffect, useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import CP1 from "../assets/CP1.jpg";
import CP2 from "../assets/CP2.jpg";
import CP3 from "../assets/CP3.jpg";
import SG1 from "../assets/SG1.jpg";
import GardenersCard from "./GardenersCard";
import GardenersCarouselCard from "./GardenersCarouselCard";

interface Gardener {
  id: number;
  title: string;
  description: string;
  image: string;
  profileImage: string;
  name: string;
  badge: string;
  location: string;
  price: string;
}

const gardeners: Gardener[] = [
  {
    id: 1,
    title: "Indoor-Outdoor Green Retreat",
    description: "Create a green sanctuary at home, indoors or out...",
    image: CP1,
    profileImage: SG1,
    name: "Eko Susiloanto",
    badge: "Super Grower",
    location: "San Ramon, California, 20miles away",
    price: "122",
  },
  {
    id: 2,
    title: "Your Indoor-Outdoor Garden Oasis",
    description: "Design a cozy garden retreat, inside and out...",
    image: CP2,
    profileImage: SG1,
    name: "Eko Susiloanto",
    badge: "Super Grower",
    location: "San Ramon, California, 20miles away",
    price: "122",
  },
  {
    id: 3,
    title: "Garden Spaces",
    description: "Bring your garden dreams to life, indoors and outdoors...",
    image: CP3,
    profileImage: SG1,
    name: "Eko Susiloanto",
    badge: "Newbie",
    location: "San Ramon, California, 20miles away",
    price: "122",
  },
  {
    id: 4,
    title: "Home Garden Haven",
    description: "Craft a serene garden escape, indoors or outdoors...",
    image: CP3,
    profileImage: SG1,
    name: "Eko Susiloanto",
    badge: "Newbie",
    location: "San Ramon, California, 20miles away",
    price: "122",
  },
  {
    id: 5,
    title: "Your Perfect Home Garden",
    description: "Your ideal garden retreat, wherever you are...",
    image: CP3,
    profileImage: SG1,
    name: "Eko Susiloanto",
    badge: "Newbie",
    location: "San Ramon, California, 20miles away",
    price: "122",
  },
];

const GardenersShowcase: React.FC = () => {
  // State for the current offset of the products
  const [currentOffset, setCurrentOffset] = useState(0);

  // Ref to the product container to calculate the width of a single product card
  const productContainerRef = useRef<HTMLDivElement | null>(null);

  // Dynamically calculate the width of a product card
  const [productWidth, setProductWidth] = useState(0);

  // Gap size in pixels (based on Tailwind's gap-6)
  const gap = 24;

  useEffect(() => {
    // Calculate product width once the component is mounted
    if (productContainerRef.current) {
      setProductWidth(
        productContainerRef.current.children[0].getBoundingClientRect().width
      );
    }
  }, []);

  // Define the number of products visible at once (4 in this case)
  const visibleCards = 3;

  // Total width of one product card including the gap
  const totalWidthPerCard = productWidth + gap;

  const maxOffset = -(gardeners.length - visibleCards) * totalWidthPerCard;

  // Move to the next 4 products
  const nextProducts = () => {
    if (currentOffset > maxOffset) {
      setCurrentOffset(currentOffset - totalWidthPerCard);
    }
  };

  // Move to the previous 4 products
  const prevProducts = () => {
    if (currentOffset < 0) {
      setCurrentOffset(currentOffset + totalWidthPerCard);
    }
  };

  return (
    <div className="max-w-full mx-6 md:mx-12 py-12">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="text-primary font-medium text-xl mb-2">Community</div>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Meet Our Gardeners
        </h1>
        <p className="text-teritary text-lg md:text-2xl w-full lg:w-[54%]">
          Behind every garden is a story. Here at Growers Hub, we celebrate our
          community and share their journeys. Meet our gardeners, hear their
          stories, and see how they've transformed simple spaces into thriving
          gardens.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="justify-end gap-10 mb-6 hidden xl:flex">
        <button
          className={`p-4 rounded-full ${
            currentOffset === 0
              ? "bg-teritary text-white cursor-not-allowed"
              : "bg-primary hover:bg-primary text-white"
          }`}
          onClick={prevProducts}
          disabled={currentOffset === 0}
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>
        <button
          className={`p-4 rounded-full ${
            currentOffset <= maxOffset
              ? "bg-teritary text-white cursor-not-allowed"
              : "bg-primary hover:bg-primary text-white"
          }`}
          onClick={nextProducts}
          disabled={currentOffset <= maxOffset}
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Cards Grid with Sliding Animation */}
      <div className="overflow-hidden">
        <div
          ref={productContainerRef}
          className="hidden xl:flex gap-6 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(${currentOffset}px)`, // Move the grid of products horizontally
          }}
        >
          {gardeners.map((product, index) => (
            <div className="flex-none" key={index}>
              <GardenersCard {...product} />
            </div>
          ))}
        </div>
        <div>
          <GardenersCarouselCard products={gardeners} />
        </div>
      </div>
    </div>
  );
};

export default GardenersShowcase;
