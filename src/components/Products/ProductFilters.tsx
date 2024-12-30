import React, { useState } from "react";
import { useSelector } from "react-redux";

interface ProductFilterProps {
  selectedCategories?: { categoryName: string }[];
  setSelectedFilter?: (filter: string) => void;
  setSortBy?: (sortOption: string) => void;
  selectedFilter?: any;
  sortBy?: string;
  totalProducts?: any;
}

const ProductFilterBar: React.FC<ProductFilterProps> = ({
  selectedCategories,
  setSelectedFilter,
  setSortBy,
  selectedFilter,
  sortBy,
  totalProducts,
}) => {
  const filters = ["All", "Plant", "Compost", "Freshly Sourced", "Produce"];
  const userData = useSelector((state: any) => state.userData.data);

  const combinedFilters = selectedCategories?.length
    ? selectedCategories
    : filters;

  return (
    <div className="flex flex-col items-start justify-between gap-5 w-full px-6 py-10 bg-white lg:px-12 tabmd:items-center tabmd:py-12 tabmd:gap-0 tabmd:flex-row">
      <div className="order-2 flex w-full flex-1 items-center space-x-2 overflow-x-auto whitespace-nowrap tabmd:order-1 tabmd:min-w-[400px]">
        {combinedFilters.map((filter: any, index) => (
          <button
            key={index}
            onClick={() => setSelectedFilter && setSelectedFilter(filter?._id)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm transition-colors
              ${
                selectedFilter === filter?._id
                  ? "bg-green-100 font-medium text-green-800"
                  : "border-primary border hover:bg-gray-50"
              }`}
          >
            {filter?.categoryName}
          </button>
        ))}
      </div>

      {sortBy && (
        <div className="flex items-center space-x-4 order-1 tabmd:justify-center tabmd:order-2">
          <div className="flex items-center space-x-2 border border-secondary rounded-full px-4 py-3">
            <span className="text-sm text-teritary">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy && setSortBy(e.target.value)}
              className="text-sm bg-none"
            >
              <option value="Popularity">Popularity</option>
              <option value="Newest">Newest</option>
              {userData && !userData?.isSeller && (
                <option value="Price">Price</option>
              )}
              <option value="Location">Location</option>
            </select>
          </div>

          <span className="text-sm text-teritary">
            Showing {totalProducts} Products
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductFilterBar;
