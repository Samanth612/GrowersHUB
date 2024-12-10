import React, { useState } from "react";

const ProductListings: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  return (
    <div className="max-w-full mx-auto bg-white">
      <div className="flex flex-wrap items-center justify-between py-4 px-6 sm:px-12 border-b shadow-inner gap-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-10">
          <div className="flex">
            <h1 className="text-xl text-secondary font-semibold">
              Your Listings
            </h1>
            <span className="ml-2 bg-premiumgray text-secondary text-sm px-2 py-0.5 rounded-full">
              {12} {/* Show total unread count */}
            </span>
          </div>
          {/* Search Bar */}
          <input
            type="text"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Products"
            className="w-full max-w-[250px] sm:min-w-[320px]  px-4 py-3 bg-premiumgray rounded-lg placeholder:text-teritary focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Filter Buttons */}
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
    </div>
  );
};

export default ProductListings;
