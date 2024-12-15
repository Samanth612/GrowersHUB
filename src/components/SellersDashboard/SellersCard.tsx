import { MapPin } from "lucide-react";
import React, { useState } from "react";
import Icons from "../../Utilities/Icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../Store/store";

interface Product {
  title: string;
  location: string;
  price: string;
  image: string;
  categories: string[];
  id: string;
}

const SellersCard: React.FC<{
  product: Product;
  setEditing: any;
  setuploadButtonClicked: any;
}> = ({ product, setEditing, setuploadButtonClicked }) => {
  const [unitsSold, setUnitsSold] = useState(5);
  const maxUnits = 10;
  const userData = useSelector((state: any) => state.userData.data);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (unitsSold < maxUnits) {
      setUnitsSold(unitsSold + 1);
    }
  };

  const handleDecrement = () => {
    if (unitsSold > 0) {
      setUnitsSold(unitsSold - 1);
    }
  };

  const handleMarkAsSold = () => {
    console.log("Marked as sold");
  };

  const handleEdit = async (productId: any) => {
    const response = await axios.get(
      `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/user/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${userData?.access_token}`,
          "Cache-Control": "no-cache",
        },
      }
    );
    if (response.data.status) {
      dispatch({
        type: "sellersProductData",
        payload: {
          data: response.data.data,
        },
      });
    }

    setEditing(true);
    setuploadButtonClicked(true);
  };

  const handleDelete = async (productId: string) => {
    try {
      const response = await axios.post(
        `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/seller/products/delete/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      if (response.data.status) {
        console.log("Product deleted successfully:", response.data.data);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between bg-white border border-gray-300 rounded-[20px] shadow-inner">
      <div className="flex gap-3 sm:gap-8 items-center p-2 sm:p-4">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-32 h-32 object-cover rounded-[20px]"
        />

        {/* Product Title and Tags */}
        <div>
          <div className="flex flex-wrap-reverse gap-3 items-center">
            <h3 className="text-lg font-semibold text-secondary">
              {product.title}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {product.categories.map((category, index) => (
                <span
                  key={index}
                  className="text-xs text-primary bg-premiumgreen px-2 py-1 rounded-md"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Product Location */}
          <div className="flex items-center mt-1 gap-1 text-teritary">
            <MapPin className="w-5 h-5" />
            <span className="text-sm text-teritary">{product.location}</span>
          </div>

          {/* Price */}
          <div className="mt-4 text-2xl font-bold text-secondary hidden sm:block">
            ${product.price}
            <span className="text-lg font-normal text-teritary">/unit</span>
          </div>
        </div>
      </div>

      {/* Units Sold */}
      <div className="hidden flex-col items-end gap-2 sm:flex">
        <div className="flex items-center gap-12 pr-5">
          <button onClick={() => handleDelete(product.id)}>
            <Icons variant="Delete" />
          </button>
          <button onClick={() => handleEdit(product.id)}>
            <Icons variant="Edit" />
          </button>
        </div>
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-teritary font-semibold">
              Mark units sold
            </div>
            <div className="flex items-center bg-white border-2 rounded-lg border-premiumgray space-x-3">
              <button
                onClick={handleDecrement}
                className="text-gray-600 rounded-full p-2 transition-colors"
              >
                -
              </button>
              <span className="text-sm text-teritary">
                <span className="font-bold">{unitsSold}</span> / {maxUnits}
              </span>
              <button
                onClick={handleIncrement}
                className="text-gray-600 rounded-full p-2 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Mark as Sold Button */}
          <button
            onClick={handleMarkAsSold}
            className="bg-white text-sm font-bold text-secondary px-4 py-3 mt-6 rounded-md border border-secondary transition-colors"
          >
            Mark as Sold
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full p-2 sm:p-4 sm:hidden">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            ${product.price}
            <span className="text-lg font-normal text-teritary">/unit</span>
          </div>
          <div className="flex items-center gap-6">
            <button>
              <Icons variant="Delete" />
            </button>
            <button>
              <Icons variant="Edit" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-teritary font-semibold">
              Mark units sold
            </div>
            <div className="flex items-center bg-white border-2 rounded-lg border-premiumgray space-x-3">
              <button
                onClick={handleDecrement}
                className="text-gray-600 rounded-full p-2 transition-colors"
              >
                -
              </button>
              <span className="text-sm text-gray-700">
                <span className="font-bold">{unitsSold}</span> / {maxUnits}
              </span>
              <button
                onClick={handleIncrement}
                className="text-gray-600 rounded-full p-2 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Mark as Sold Button */}
          <button
            onClick={handleMarkAsSold}
            className="bg-white text-sm font-bold text-secondary px-4 py-3 mt-6 mb-2 rounded-md border border-secondary transition-colors"
          >
            Mark as Sold
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellersCard;
