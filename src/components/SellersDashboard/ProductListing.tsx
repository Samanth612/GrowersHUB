import React, { useEffect, useState } from "react";
import Pagination from "../../Utilities/Pagination";
import { useNavigate } from "react-router-dom";
import JP1 from "../../assets/JP1.jpg";
import JP2 from "../../assets/JP2.jpg";
import JP3 from "../../assets/JP3.jpg";
import JP4 from "../../assets/JP4.jpg";
import SG1 from "../../assets/SG1.jpg";
import SellersCard from "./SellersCard";

const ProductListings: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const products = [
    {
      title: "Crassula small leaf plant",
      location: "San Ramon, California",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
      profileImage: SG1,
      name: "Joanna Wellick",
      categories: ["Succulent", "Indoor Plant", "Freshly Sourced"], // Added categories
    },
    {
      title: "Lemon",
      location: "San Ramon, California",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      categories: ["Fruit", "Citrus", "Freshly Sourced"], // Added categories
    },
    {
      title: "Mint",
      location: "San Ramon, California",
      price: "122",
      image: JP3,
      profileImage: SG1,
      name: "Joanna Wellick",
      categories: ["Herb", "Freshly Sourced"], // Added categories
    },
    {
      title: "Betel leaf plants",
      location: "San Ramon, California",
      price: "122",
      unitInfo: "unit",
      stock: "1 Unit left",
      image: JP4,
      profileImage: SG1,
      name: "Joanna Wellick",
      categories: ["Indoor Plant", "Freshly Sourced"], // Added categories
    },
    {
      title: "Crassula small leaf plant (Repeat)",
      location: "San Ramon, California",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
      profileImage: SG1,
      name: "Joanna Wellick",
      categories: ["Succulent", "Indoor Plant", "Freshly Sourced"], // Added categories
    },
    {
      title: "Lemon (Repeat)",
      location: "San Ramon, California",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      categories: ["Fruit", "Citrus", "Freshly Sourced"], // Added categories
    },
  ];

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Fixed at 4 items per page

  // Calculate the displayed products for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-full mx-auto bg-white">
      <div className="flex flex-wrap items-center justify-between py-4 px-6 sm:px-12 border-b shadow-inner gap-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-10">
          <div className="flex">
            <h1 className="text-xl text-secondary font-semibold">
              Your Listings
            </h1>
            <span className="ml-2 bg-premiumgray text-secondary text-sm px-2 py-0.5 rounded-full">
              {products.length}
            </span>
          </div>
          <input
            type="text"
            placeholder="Search Products"
            className="w-full max-w-[250px] sm:min-w-[320px] px-4 py-3 bg-premiumgray rounded-lg placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex gap-2">
          {["all", "available", "sold out"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-1 rounded-md ${
                filter === filterType
                  ? "text-primary font-medium bg-premiumgreen"
                  : "text-secondary border border-primary hover:bg-premiumgray"
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between h-full p-4 sm:p-10">
        <div className="w-full transition-all duration-300 ease-in">
          <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-4 gap-5 pb-4 mb-10">
            {currentProducts.map((product, index) => (
              <SellersCard key={index} product={product} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 py-4">
          <Pagination
            id={"type2"}
            currentPage={currentPage}
            totalPages={Math.ceil(products.length / itemsPerPage)}
            onPageChange={handlePageChange}
            displayRange={3}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListings;
