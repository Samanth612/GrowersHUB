import React from "react";
import { Share2, Heart, MapPin, Flame } from "lucide-react";
import Icons from "../../Utilities/Icons";

interface ProductCardProps {
  title: string;
  location: string;
  price: string | number;
  unitInfo?: string;
  stock?: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  location,
  price,
  unitInfo,
  stock,
  image,
}) => {
  return (
    <div className="relative w-80 rounded-lg overflow-hidden bg-white shadow-md">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-cover" />

        {/* Super Grower Badge */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-lg">
          <div className="flex items-center gap-2">
            {/* <div className="w-2 h-2 bg-green-600 rounded-full" /> */}
            <Icons variant="SuperGrow" />
            <span className="text-sm text-primary font-medium">
              Super Grower
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 w-72 truncate">{title}</h3>
        <div className="flex items-center gap-1 text-teritary mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Price and Stock Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">${price}</span>
            {unitInfo && <span className="text-teritary">/{unitInfo}</span>}
          </div>
          {stock && (
            <div className="flex items-center gap-1 text-orange-500 bg-[#FFB02E26] px-3 py-1 border-0 rounded-lg">
              <Flame className="w-4 h-4" />
              <span className="text-sm text-secondary font-medium">
                {stock}
              </span>
            </div>
          )}
        </div>

        {/* Connect Button */}
        <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-500 transition">
          Connect
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
