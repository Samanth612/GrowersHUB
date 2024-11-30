import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import JP1 from "../../assets/JP1.jpg";
import JP2 from "../../assets/JP2.jpg";
import JP3 from "../../assets/JP3.jpg";
import JP4 from "../../assets/JP4.jpg";

const AllSellers: React.FC = () => {
  const products = [
    {
      title: "Crassula small leaf plant",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
    },
    {
      title: "Lemon",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
    },
    {
      title: "Mint",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP3,
    },
    {
      title: "Betel leaf plants",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "unit",
      stock: "1 Unit left",
      image: JP4,
    },
    {
      title: "Crassula small leaf plant (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
    },
    {
      title: "Lemon (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
    },
  ];

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
  const visibleCards = 4;

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
    <div className="px-6 lg:px-20 py-8 bg-white">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-5xl font-semibold leading-normal">All Sellers</h1>

        {/* Navigation Arrows */}
        <div className="flex gap-10">
          <button
            className={`p-2 ${
              currentOffset === 0
                ? "bg-teritary"
                : "bg-primary hover:bg-green-500"
            } rounded-full text-white`}
            onClick={prevProducts}
            disabled={currentOffset === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className={`p-2 ${
              currentOffset <= maxOffset
                ? "bg-teritary"
                : "bg-primary hover:bg-green-500"
            } rounded-full text-white`}
            onClick={nextProducts}
            disabled={currentOffset <= maxOffset}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Product Grid with Smooth Sliding */}
      <div className="overflow-hidden">
        <div
          ref={productContainerRef}
          className="flex gap-6 transition-transform duration-500 ease-in-out"
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
    </div>
  );
};

export default AllSellers;
