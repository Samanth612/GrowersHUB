import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Icons from "../../Utilities/Icons";
import { Flame, Heart, Share2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { INBOX, LOGIN, VIEWSELLERSGARDEN } from "../../Utilities/constantLinks";
import { useSelector } from "react-redux";
import axios from "axios";
import { CONFIG } from "../../config";
import { store } from "../../Store/store";
import SG1 from "../../assets/SG1.jpg";
import toast from "react-hot-toast";
import Modal from "../Modal";
import ShareAlbumModal from "../ShareAlbumModal";

interface ProductProps {
  productData?: any;
  isLoading?: any;
}

const Product: React.FC<ProductProps> = ({ productData, isLoading }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false); // Track manual interactions
  const [whislisted, setWishListed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectVideo, setSelectedVideo] = useState<any>(null);
  const userData = useSelector((state: any) => state.userData.data);
  const AuthReducer = useSelector((state: any) => state.auth);

  const totalSlides = productData?.images?.length || 1;

  // Navigate to the next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Reset timer on manual interaction
  const handleControlClick = (newIndex: number) => {
    setActiveIndex(newIndex);
    setIsManualChange(true); // Mark as manual change
  };

  const handleWishList = async () => {
    if (!AuthReducer) {
      scrollTo(0, 0);
      navigate(LOGIN);
      return;
    }

    try {
      const payload = {
        id: productData?._id,
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

  const openModal = () => {
    store.dispatch({
      type: "ShareId",
      payload: {
        data: { id: productData?._id, type: "product" },
      },
    });
    setSelectedVideo({
      src: productData?.video ? productData?.video : productData?.images[0],
      title: productData?.name,
      type: productData?.video ? "video" : "image",
    });
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isManualChange) {
      const timeoutId = setTimeout(() => setIsManualChange(false), 5000);
      return () => clearTimeout(timeoutId);
    }

    const intervalId = setInterval(nextSlide, 5000); // Auto-scroll interval
    return () => clearInterval(intervalId);
  }, [isManualChange, totalSlides]);

  useEffect(() => {
    setWishListed(!!productData?.isWishlisted);
  }, [productData?.isWishlisted]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          children={
            <ShareAlbumModal onClose={closeModal} selectVideo={selectVideo} />
          }
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="px-6 lg:px-12 py-12 bg-white">
        <a
          href="/products"
          className="flex items-center gap-1 mb-4 text-sm font-medium text-secondary"
        >
          <span>
            <Icons variant="moveBackArrow" />
          </span>
          <span className="text-lg">Back to Product Listing</span>
        </a>
        <div className="grid grid-cols-1 gap-8 md:gap-20 lg:grid-cols-2">
          {/* Left Section: Image Gallery */}
          <div>
            <div className="relative h-full w-full overflow-hidden">
              {/* Slides */}
              <div
                className="flex h-full w-full transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                }}
              >
                {productData?.images?.map((image: string, index: number) => (
                  <div
                    className="w-full flex-shrink-0 flex items-center justify-center"
                    key={index}
                  >
                    <div className="relative w-[600px] rounded-lg overflow-hidden bg-white">
                      <div className="relative">
                        <img
                          src={image}
                          alt={productData?.name || "Product Image"}
                          className="w-full h-96 object-cover"
                        />

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100"
                            onClick={openModal}
                          >
                            <Share2 className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100 z-50"
                            onClick={handleWishList}
                          >
                            {whislisted ? (
                              <Icons variant="wishList" />
                            ) : (
                              <Heart className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              {productData?.images?.length > 1 && (
                <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 space-x-3">
                  {productData?.images?.map((_: any, index: number) => (
                    <button
                      key={index}
                      className={`h-3 w-3 rounded-full ${
                        activeIndex === index ? "bg-teritary" : "bg-gray-300"
                      }`}
                      onClick={() => handleControlClick(index)}
                    />
                  ))}
                </div>
              )}

              {/* Previous Button */}
              {productData?.images?.length > 1 && (
                <div className="absolute left-0 top-0 flex h-full items-center justify-center px-4">
                  <button
                    onClick={() =>
                      handleControlClick(
                        (activeIndex - 1 + totalSlides) % totalSlides
                      )
                    }
                    className={`p-4 rounded-full ${
                      activeIndex === 0
                        ? "bg-teritary text-white cursor-not-allowed"
                        : "bg-primary hover:bg-green-500 text-white"
                    }`}
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Next Button */}
              {productData?.images?.length > 1 && (
                <div className="absolute right-0 top-0 flex h-full items-center justify-center px-4">
                  <button
                    onClick={() =>
                      handleControlClick((activeIndex + 1) % totalSlides)
                    }
                    className={`p-4 rounded-full ${
                      activeIndex === totalSlides - 1
                        ? "bg-teritary text-white cursor-not-allowed"
                        : "bg-primary hover:bg-green-500 text-white"
                    }`}
                  >
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div>
            <div className="mb-4 flex space-x-2">
              {productData?.categories?.map((category: any) => (
                <span
                  key={category._id}
                  className="rounded-[4px] bg-[#00701C11] px-3 py-1 text-sm font-medium text-[#00701C]"
                >
                  {category.categoryName}
                </span>
              ))}
            </div>
            <h1 className="mb-4 text-4xl font-semibold">{productData?.name}</h1>
            <div className="mb-4 flex items-center gap-2">
              {productData?.userDetails?.address && (
                <iframe
                  title="Google Map"
                  width="120"
                  height="80"
                  style={{ borderRadius: "10px" }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps/embed/v1/place?key=${
                    CONFIG?.MAP_KEY
                  }&q=${encodeURIComponent(productData?.userDetails?.address)}`}
                ></iframe>
              )}
              <div className="text-teritary flex flex-col">
                <span className="flex items-center gap-1">
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.62404 4.5C2.62404 3.18832 3.68736 2.125 4.99904 2.125C6.31071 2.125 7.37404 3.18832 7.37404 4.5C7.37404 5.81168 6.31071 6.875 4.99904 6.875C3.68736 6.875 2.62404 5.81168 2.62404 4.5ZM4.99904 2.875C4.10157 2.875 3.37404 3.60254 3.37404 4.5C3.37404 5.39746 4.10157 6.125 4.99904 6.125C5.8965 6.125 6.62404 5.39746 6.62404 4.5C6.62404 3.60254 5.8965 2.875 4.99904 2.875Z"
                      fill="#212529"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.761218 3.92843C0.938381 1.77912 2.73446 0.125 4.89105 0.125H5.10702C7.26362 0.125 9.05969 1.77912 9.23685 3.92843C9.33202 5.083 8.97538 6.22945 8.24206 7.12629L5.84552 10.0572C5.40802 10.5922 4.59005 10.5922 4.15255 10.0572L1.75602 7.12629C1.02269 6.22945 0.666048 5.083 0.761218 3.92843ZM4.89105 0.875C3.12478 0.875 1.65378 2.22974 1.50868 3.99004C1.42948 4.95096 1.7263 5.90512 2.33663 6.65154L4.73316 9.58243C4.87058 9.75048 5.1275 9.75048 5.26491 9.58243L7.66144 6.65153C8.27178 5.90512 8.5686 4.95096 8.48939 3.99004C8.34429 2.22974 6.87329 0.875 5.10702 0.875H4.89105Z"
                      fill="#212529"
                    />
                  </svg>
                  <span className="text-secondary text-sm font-medium">
                    {productData?.userDetails?.address}
                  </span>
                </span>
                <span>20 Miles away</span>
              </div>
            </div>
            <p className="text-teritary mb-12 w-[75%]">
              {productData?.description}
            </p>
            <div className="mb-12 flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={productData?.userDetails?.image || SG1}
                  alt={productData?.userDetails?.name || "Gardener"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold">
                  {productData?.userDetails?.name}
                </p>
              </div>
            </div>
            <div className="mb-8 flex items-center gap-5">
              <span className="text-3xl font-medium">
                ${productData?.price}
                <span className="text-teritary font-normal">/unit</span>
              </span>
              {productData?.unitSale - productData?.noOfUnitsSold > 0 && (
                <div className="flex items-center gap-1 text-orange-500 bg-[#FFB02E26] px-3 py-1 border-0 rounded-lg">
                  <Flame className="w-4 h-4" />
                  <span className="text-xs text-secondary font-medium">
                    Only {productData?.unitSale - productData?.noOfUnitsSold}{" "}
                    units left
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-5 items-center sm:flex-row">
              <button
                className="text-sm rounded-lg border border-secondary bg-white px-8 py-2 text-secondary font-semibold hover:bg-gray-200"
                onClick={() => {
                  scrollTo(0, 0);
                  navigate(`${VIEWSELLERSGARDEN}?id=${productData?.userId}`, {
                    state: productData?.userId,
                  });
                }}
              >
                View Seller's Garden
              </button>
              <button
                className="text-sm rounded-lg bg-primary px-12 font-semibold py-2 text-white hover:bg-green-500"
                onClick={() => {
                  if (!AuthReducer) {
                    scrollTo(0, 0);
                    navigate(LOGIN);
                    return;
                  }

                  const productId = productData?._id;
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
                    .catch((err: any) =>
                      toast.error(err?.response?.data?.message)
                    );
                }}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
