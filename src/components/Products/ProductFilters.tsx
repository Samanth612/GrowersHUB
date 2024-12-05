import React, { useState } from "react";

const ProductFilterBar: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");

  const filters = ["All", "Plant", "Compost", "Freshly Sourced", "Produce"];

  return (
    <div className="flex flex-col items-start justify-between gap-5 w-full px-6 py-10 bg-white lg:px-20 tabmd:items-center tabmd:py-12 tabmd:gap-0 tabmd:flex-row">
      <div className="order-2 flex w-full flex-1 items-center space-x-2 overflow-x-auto whitespace-nowrap tabmd:order-1 tabmd:min-w-[400px]">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm transition-colors
              ${
                selectedFilter === filter
                  ? "bg-green-100 font-medium text-green-800"
                  : "border-primary border hover:bg-gray-50"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4 order-1 tabmd:justify-center tabmd:order-2">
        <div className="flex items-center space-x-2 border border-secondary rounded-full px-4 py-3">
          <span className="text-sm text-teritary">Sort By</span>
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

        <span className="text-sm text-teritary">Showing 100 Products</span>
      </div>
    </div>
  );
};

export default ProductFilterBar;
