import React, { useEffect, useState } from "react";
import { Share2, Heart, MapPin } from "lucide-react";
import Icons from "./Icons";
import SG1 from "../assets/SG1.jpg";
import { useNavigate } from "react-router-dom";
import { LOGIN, VIEWSELLERSGARDEN } from "./constantLinks";
import axios from "axios";
import { CONFIG } from "../config";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface ProductCardProps {
  id?: string;
  title: string;
  location: string;
  price: string | number;
  unitInfo?: string | number;
  stock?: string | number;
  image: string;
  profileImage: string;
  products: { image: string }[];
  name: string;
  setSelectedAlbum: any;
  userId?: any;
  isSeller?: any;
  isWishlisted?: any;
  video?: any;
}

const CarouselCard: React.FC<ProductCardProps> = ({
  id,
  title,
  location,
  price,
  unitInfo,
  stock,
  products,
  name,
  profileImage,
  setSelectedAlbum,
  userId,
  isSeller,
  isWishlisted,
  video,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false);
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
        id,
        title,
        location,
        price,
        unitInfo,
        stock,
        products,
        profileImage,
        name,
        isSeller,
        isWishlisted,
        userId,
        video,
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
    <div className="relative w-full max-w-96 rounded-lg overflow-hidden bg-white shadow-md">
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
                  className="w-full h-full cursor-pointer object-cover rounded-lg"
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
        {price && (
          <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Icons variant="PriceBadge" />
                <span className="text-xl font-medium">
                  {price ? `$${price}` : `$${122}`}
                </span>
                {unitInfo && <span className="text-teritary">/{unitInfo}</span>}
              </div>
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
        <h3 className="flex text-xl font-semibold mb-2 w-72 truncate">
          {title}

          {Number(unitInfo) - Number(stock) > 0 && (
            <div className="flex bg-premiumgreen px-2 py-1 rounded-lg ml-2">
              <span className="text-sm text-primary font-medium">For Sale</span>
            </div>
          )}
        </h3>
        <div className="flex items-center gap-1 text-teritary mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Price Badge */}
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
      </div>
    </div>
  );
};

export default CarouselCard;
