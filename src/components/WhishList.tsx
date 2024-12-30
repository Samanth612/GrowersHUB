import { MapPin } from "lucide-react";
import React from "react";

interface item {
  name: string;
  images: string;
  location: string;
}

interface WhishListProps {
  items: item[];
  loading: boolean;
}

const WhishList: React.FC<WhishListProps> = ({ items, loading }) => {
  return (
    <div className="scale-75">
      <div className="absolute top-0 mt-2 -right-48 min-w-[420px] bg-white shadow-lg rounded-lg z-30 max-h-[720px] overflow-hidden laptopviewxll:right-0">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h1 className="text-xl font-semibold">WishList</h1>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="loader"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500 text-lg font-medium">
              🛒 No wishlist products found!
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li
                key={index}
                className={`p-4 hover:bg-gray-200 ${
                  index === items.length - 1 ? "hover:rounded-b-lg" : ""
                } flex items-start`}
              >
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-12 h-12 rounded-full shadow-md mr-3"
                />
                <div>
                  <p className="font-semibold text-xl text-secondary">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-teritary">
                    <MapPin className="w-4 h-4" />
                    <p className="text-sm text-teritary">{item.location}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WhishList;
