import React, { useEffect, useState } from "react";
import { Share2, Heart, MapPin, Flame } from "lucide-react";
import Icons from "../../Utilities/Icons";
import { useNavigate } from "react-router-dom";
import { INBOX, LOGIN, PRODUCT } from "../../Utilities/constantLinks";
import { store } from "../../Store/store";
import axios from "axios";
import { CONFIG } from "../../config";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

interface ProductCardProps {
  title: string;
  location: string;
  price: string | number;
  unitInfo?: any;
  stock?: any;
  image: string;
  isSeller?: string;
  isWishlisted?: string;
  id?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  location,
  price,
  unitInfo,
  stock,
  image,
  isSeller,
  isWishlisted,
  id,
}) => {
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.userData.data);
  const AuthReducer = useSelector((state: any) => state.auth);
  const [whislisted, setWishListed] = useState(false);

  const handleWishList = async () => {
    if (!AuthReducer) {
      scrollTo(0, 0);
      navigate(LOGIN);
      return;
    }

    try {
      const payload = {
        id: id,
        type: "Product",
      };

      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/user/wishlist/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
          },
        }
      );
      if (response?.data?.status) {
        setWishListed((prev) => !prev);
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setWishListed(!!isWishlisted);
  }, [isWishlisted]);

  return (
    <div className="relative w-96 rounded-lg overflow-hidden bg-white shadow-md">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover cursor-pointer"
          onClick={() => {
            scrollTo(0, 0);
            navigate(`${PRODUCT}?id=${id}`, { state: id });
          }}
        />

        {/* Super Grower Badge */}
        {isSeller && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-lg">
            <div className="flex items-center gap-2">
              {/* <div className="w-2 h-2 bg-green-600 rounded-full" /> */}
              <Icons variant="SuperGrow" />
              <span className="text-sm text-primary font-medium">
                Super Grower
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {/* <button className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100">
            <Share2 className="w-5 h-5" />
          </button> */}
          <button
            className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100"
            onClick={handleWishList}
          >
            {whislisted ? (
              <Icons variant="wishList" />
            ) : (
              <Heart className={"w-5 h-5"} />
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3
          className="text-xl font-semibold mb-2 w-72 truncate cursor-pointer"
          onClick={() => {
            scrollTo(0, 0);
            navigate(`${PRODUCT}?id=${id}`, { state: id });
          }}
        >
          {title}
        </h3>
        <div
          className="flex items-center gap-1 text-teritary mb-3 cursor-pointer"
          onClick={() => {
            scrollTo(0, 0);
            navigate(`${PRODUCT}?id=${id}`, { state: id });
          }}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Price and Stock Info */}
        <div
          className="flex items-center gap-3 mb-4 cursor-pointer"
          onClick={() => {
            scrollTo(0, 0);
            navigate(`${PRODUCT}?id=${id}`, { state: id });
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">${price}</span>
            {unitInfo && <span className="text-teritary">/{unitInfo}</span>}
          </div>
          {unitInfo - stock > 0 && stock > 0 && (
            <div className="flex items-center gap-1 text-orange-500 bg-[#FFB02E26] px-3 py-1 border-0 rounded-lg">
              <Flame className="w-4 h-4" />
              <span className="text-sm text-secondary font-medium">
                {`${stock} units sold`}
              </span>
            </div>
          )}
        </div>

        {/* Connect Button */}
        <button
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-500 transition"
          onClick={() => {
            if (!AuthReducer) {
              scrollTo(0, 0);
              navigate(LOGIN);
              return;
            }

            const productId = id;
            axios
              .post(
                `${CONFIG?.CHAT_BASE_URL}/chat/join`,
                { id: productId, type: "Product" },
                {
                  headers: {
                    Authorization: `Bearer ${userData?.access_token}`,
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                store.dispatch({
                  type: "chatRoomId",
                  payload: {
                    data: res?.data?.data?.chatRoomId,
                  },
                });
                scrollTo(0, 0);
                navigate(INBOX, { state: res?.data?.data?.chatRoomId });
              })
              .catch((err: any) => toast.error(err?.response?.data?.message));
          }}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
