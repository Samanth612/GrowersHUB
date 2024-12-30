import React, { useEffect, useState } from "react";
import { Heart, MapPin, Share2 } from "lucide-react";
import JP1 from "../assets/JP1.jpg";
import SG1 from "../assets/SG1.jpg";
import Icons from "../Utilities/Icons";
import { useNavigate } from "react-router-dom";
import {
  COMMUNITY,
  INBOX,
  LOGIN,
  VIEWSELLERSGARDEN,
} from "../Utilities/constantLinks";
import axios from "axios";
import { CONFIG } from "../config";
import { store } from "../Store/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

interface ProductCardProps {
  title: string;
  location: string;
  price: string | number;
  unitInfo?: string;
  stock?: string;
  image: string;
  profileImage: string;
  products: { image: string }[];
  name: string;
  setSelectedAlbum: any;
  id?: any;
  userId?: any;
  isSeller?: any;
  isWishlisted?: any;
  isModalOpen?: any;
  setIsModalOpen?: any;
  video?: any;
  setSelectedVideo?: any;
}

const GardenersCard: React.FC<ProductCardProps> = ({
  title,
  location,
  price,
  unitInfo,
  products,
  name,
  profileImage,
  setSelectedAlbum,
  id,
  userId,
  isSeller,
  isWishlisted,
  isModalOpen,
  setIsModalOpen,
  video,
  setSelectedVideo,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false); // Track manual interactions
  const [clickedItems, setClickedItems] = useState([]);
  const [whislisted, setWishListed] = useState(false);
  const totalSlides = products?.length;
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.userData.data);
  const AuthReducer = useSelector((state: any) => state.auth);

  // Navigate to the next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Reset timer on manual interaction
  const handleControlClick = (newIndex: number) => {
    setActiveIndex(newIndex);
    setIsManualChange(true); // Mark as manual change
  };

  const handleImageClick = () => {
    scrollTo(0, 0);
    const productData: any = [
      {
        title,
        location,
        price,
        unitInfo,
        products,
        profileImage,
        name,
        id,
        isSeller,
        isWishlisted,
        userId,
      },
    ];

    setClickedItems(productData);
  };

  const handleWishList = async () => {
    if (!AuthReducer) {
      scrollTo(0, 0);
      navigate(LOGIN);
      return;
    }

    try {
      const payload = {
        id: id,
        type: "Album",
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

  const openModal = () => {
    store.dispatch({
      type: "ShareId",
      payload: {
        data: { id: id, type: "album" },
      },
    });
    setSelectedVideo({
      src: video ? video : products[0]?.image,
      title: title,
      type: video ? "video" : "image",
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isManualChange) {
      const timeoutId = setTimeout(() => setIsManualChange(false), 5000);
      return () => clearTimeout(timeoutId);
    }

    const intervalId = setInterval(nextSlide, 5000); // Auto-scroll interval
    return () => clearInterval(intervalId);
  }, [isManualChange, totalSlides]);

  useEffect(() => {
    setSelectedAlbum(clickedItems);
  }, [clickedItems]);

  useEffect(() => {
    setWishListed(!!isWishlisted);
  }, [isWishlisted]);

  return (
    <div className="relative w-full max-w-96 rounded-lg overflow-hidden bg-white">
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden">
          {/* Slides */}
          <div
            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {products.map((product, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={product?.image}
                  alt={"Gardener"}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={handleImageClick}
                />
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3">
            {products.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  activeIndex === index ? "bg-white" : "bg-white/50"
                } `}
                onClick={() => handleControlClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Super Grower Badge */}
        {price && price !== "N/A" && (
          <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Icons variant="PriceBadge" />
                <span className="text-xl font-medium">
                  {price && price !== "N/A" ? `$${price}` : `${122}`}
                </span>
                {unitInfo && <span className="text-teritary">/{unitInfo}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100"
            onClick={openModal}
          >
            <Share2 className="w-5 h-5" />
          </button>
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
        <h3 className="text-xl font-semibold mb-2 w-72 truncate">{title}</h3>
        <div className="flex items-center gap-1 text-teritary mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              scrollTo(0, 0);
              navigate(`${VIEWSELLERSGARDEN}?id=${userId}`, { state: userId });
            }}
          >
            <img
              src={profileImage || SG1}
              alt={"Gardener"}
              className="w-8 h-8 rounded-full object-cover mr-1"
            />
            <span className="text-xl w-[130px] truncate font-medium whitespace-nowrap">
              {name || "Joanna Wellick"}
            </span>
          </div>
          {isSeller && (
            <div>
              <div className="flex bg-premiumgreen px-2 py-1 rounded-lg">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  {/* <div className="w-2 h-2 bg-green-600 rounded-full" /> */}
                  <Icons variant="SuperGrow" />
                  <span className="text-sm text-primary font-medium">
                    Super Grower
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-5 mt-5">
          <button
            className="px-6 py-2.5 w-64 font-medium text-secondary border-2 border-secondary rounded-lg hover:bg-gray-50"
            onClick={() => {
              scrollTo(0, 0);
              navigate(`${VIEWSELLERSGARDEN}?id=${userId}`, { state: userId });
            }}
          >
            View Album
          </button>
          <button
            className="px-6 py-3 w-64 bg-primary font-medium text-white rounded-lg  hover:bg-green-500"
            onClick={() => {
              if (!AuthReducer) {
                scrollTo(0, 0);
                navigate(LOGIN);
                return;
              }

              axios
                .post(
                  `${CONFIG?.CHAT_BASE_URL}/chat/join`,
                  { id: userId, type: "User" },
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
    </div>
  );
};

export default GardenersCard;
