import React, { useState } from "react";

const ProductFilterBar = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");

  const filters = ["All", "Plant", "Compost", "Freshly Sourced", "Produce"];

  return (
    <div className="flex flex-col items-center justify-between gap-5 w-full px-6 lg:px-20 py-12 bg-white tabmd:gap-0 tabmd:flex-row">
      <div className="flex items-center space-x-2 order-2 tabmd:order-1 whitespace-nowrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors
              ${
                selectedFilter === filter
                  ? "bg-green-100 text-green-800 font-medium border border-green-600"
                  : "border border-primary hover:bg-gray-50"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4 order-1 tabmd:order-2">
        <div className="flex items-center space-x-2 border border-secondary rounded-full px-4 py-3">
          <span className="text-sm text-gray-500">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm bg-none"
          >
            <option value="Popular">Popular</option>
            <option value="Newest">Newest</option>
            <option value="Price">Price</option>
          </select>
        </div>

        <span className="text-sm text-gray-500">Showing 100 Products</span>
      </div>
    </div>
  );
};

export default ProductFilterBar;
