import React, { useEffect, useState } from "react";
import JP1 from "../../assets/JP1.jpg";
import Icons from "../../Utilities/Icons";
import { CREATEALBUM } from "../../Utilities/constantLinks";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import ShareAlbumModal from "../ShareAlbumModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "../../../Store/store";

interface Product {
  image: string;
}

interface ProductCardProps {
  title: string;
  setSplitCards: (value: boolean) => void;
  setCardName: (name: string) => void;
  products?: Product[]; // Use a more specific type if possible
  setProductCards?: any;
  id?: any;
  handleDelete?: any;
}

const PlantCard: React.FC<ProductCardProps> = ({
  title,
  setSplitCards,
  setCardName,
  products = [], // Provide a default empty array
  setProductCards,
  id,
  handleDelete,
}) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false); // Track manual interactions
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalSlides = products?.length;
  const userData = useSelector((state: any) => state.userData.data);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Navigate to the next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Reset timer on manual interaction
  const handleControlClick = (newIndex: number) => {
    setActiveIndex(newIndex);
    setIsManualChange(true); // Mark as manual change
  };

  const hanldeEdit = async (productId: any) => {
    navigate(CREATEALBUM, { state: "Edit" });
    try {
      const response = await axios.get(
        `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/user/album/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      if (response?.data?.status) {
        store.dispatch({
          type: "userAlbumData",
          payload: {
            data: response?.data?.data,
          },
        });
      }
    } catch {}
  };

  useEffect(() => {
    if (totalSlides === 0) return; // Avoid running the interval if there are no slides

    if (isManualChange) {
      const timeoutId = setTimeout(() => setIsManualChange(false), 5000);
      return () => clearTimeout(timeoutId);
    }

    const intervalId = setInterval(nextSlide, 5000); // Auto-scroll interval
    return () => clearInterval(intervalId);
  }, [isManualChange, totalSlides]);

  if (!products || products?.length === 0) {
    return (
      <div className="relative w-full max-w-96 rounded-lg overflow-hidden bg-white p-4 text-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-500">No products available.</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full max-w-96 rounded-lg overflow-hidden bg-white">
        <div className="relative">
          <div
            className="relative h-72 cursor-pointer w-full overflow-hidden"
            onClick={() => {
              setSplitCards(true);
              setCardName(title);
              setProductCards(products);
            }}
          >
            {/* Slides */}
            <div
              className="flex h-full w-full transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {products?.map((product: any, index: number) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
                    src={product}
                    alt={"Product"}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3">
              {products?.map((_, index: number) => (
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
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100"
              onClick={() => handleDelete(id)}
            >
              <Icons variant="Delete" />
            </button>
          </div>
        </div>

        <h3
          className="text-xl font-semibold cursor-pointer mt-4 mb-4 w-72 truncate"
          onClick={() => setSplitCards(true)}
        >
          {title}
        </h3>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 w-52 font-medium border border-secondary rounded-lg bg-white text-secondary text-lg"
            onClick={() => hanldeEdit(id)}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 w-52 font-medium border rounded-lg bg-primary hover:bg-green-500 text-white text-lg"
            onClick={openModal}
          >
            Share
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal children={<ShareAlbumModal onClose={closeModal} />} />
      )}
    </>
  );
};

export default PlantCard;
