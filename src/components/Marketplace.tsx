import React, { useEffect, useRef, useState } from "react";
import JP1 from "../assets/JP1.jpg";
import JP2 from "../assets/JP2.jpg";
import JP3 from "../assets/JP3.jpg";
import JP4 from "../assets/JP4.jpg";
import SG1 from "../assets/SG1.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./Products/ProductCard";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../Utilities/constantLinks";

const Marketplace: React.FC = () => {
  const products = [
    {
      title: "Crassula small leaf plant",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Lemon",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Mint",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP3,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Betel leaf plants",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "unit",
      stock: "1 Unit left",
      image: JP4,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Crassula small leaf plant (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Lemon (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Lemon",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Mint",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP3,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Betel leaf plants",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "unit",
      stock: "1 Unit left",
      image: JP4,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Crassula small leaf plant (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Lemon (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
  ];

  const navigate = useNavigate();

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

  const maxOffset = -(products.length - visibleCards) * totalWidthPerCard;

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
        <div className="text-primary font-medium text-xl">Marketplace</div>
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold">
          Where Every Plant Finds a Home
        </h1>
        <p className="text-teritary text-lg">
          Our marketplace connects you with locally grown and sustainable
          plants.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="justify-end gap-10 mb-8 -mt-8 hidden xl:flex">
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
          {products.map((product, index) => (
            <div className="flex-none" key={index}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <button
          className="px-6 py-3 font-semibold text-gray-800 border border-gray-800 rounded-md hover:bg-gray-100"
          onClick={() => navigate(PRODUCTS)}
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default Marketplace;
