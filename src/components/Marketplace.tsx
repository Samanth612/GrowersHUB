import React from "react";
import MP1 from "../assets/MP1.jpg";
import MP2 from "../assets/MP2.jpg";
import MP3 from "../assets/MP3.jpg";
import MP4 from "../assets/MP4.jpg";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Natural Plants",
    price: "$122",
    image: MP1,
    badge: "Super Grower",
  },
  {
    id: 2,
    name: "Natural Plants",
    price: "$122",
    image: MP2,
  },
  {
    id: 3,
    name: "Natural Plants",
    price: "$122",
    image: MP3,
  },
  {
    id: 4,
    name: "Natural Plants",
    price: "$122",
    image: MP4,
    badge: "Super Grower",
  },
];

const Marketplace = () => {
  return (
    <div className="max-w-full mx-6 md:mx-12 py-12">
      {/* Header Section */}
      <div className="mb-12 space-y-6">
        <div className="text-primary font-medium text-xl">Marketplace</div>
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold">
          Where Every Plant Finds a Home
        </h1>
        <p className="text-teritary text-lg">
          Our marketplace connects you with locally grown and sustainable
          plants.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-gray-50 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-[#00701C11] text-[#517B2C] rounded-full text-sm font-medium">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Image Container */}
            <div className="aspect-square relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-secondary mb-2">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button className="px-6 py-3 font-semibold text-gray-800 border border-gray-800 rounded-md hover:bg-gray-100">
          View All
        </button>
      </div>
    </div>
  );
};

export default Marketplace;
