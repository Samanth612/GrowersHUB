import React, { useEffect, useState } from "react";
import SG1 from "../assets/SG1.jpg";
import Icons from "../Utilities/Icons";
import Pagination from "../Utilities/Pagination";
import { ArrowLeft, Heart, MapPin, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { INBOX } from "../Utilities/constantLinks";
import ViewAllCards from "./ViewAllCards";

interface CommunityDetailsProps {
  selectedAlbum: any;
  setSelectedAlbum: any;
}

const ProductDetailsSection: React.FC<CommunityDetailsProps> = ({
  selectedAlbum,
  setSelectedAlbum,
}) => {
  const products = selectedAlbum[0]?.products || [];

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Calculate the displayed products for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle window resize to update items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 1490 && window.innerWidth >= 1000) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(8);
      }
    };

    updateItemsPerPage(); // Set items per page on mount

    window.addEventListener("resize", updateItemsPerPage); // Listen to window resize

    return () => {
      window.removeEventListener("resize", updateItemsPerPage); // Clean up on unmount
    };
  }, []);

  return (
    <div className="px-6 lg:px-12 py-12 bg-white">
      <button
        className="flex items-start text-secondary mb-12 gap-3"
        onClick={() => setSelectedAlbum([])}
      >
        <ArrowLeft className="w-5 h-5 mr-1 mt-1" strokeWidth={1.5} />
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-start gap-1">
            <div className="text-xl font-semibold">
              {selectedAlbum[0]?.title || "Crassula small leaf plant"}
            </div>
            <div className="flex items-center gap-1 text-teritary">
              <MapPin className="w-5 h-5" />
              <span className="text-sm text-teritary">
                {selectedAlbum[0]?.location || "San Ramon, California"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-premiumgray px-3 py-2 rounded-lg">
            <Icons variant="PriceBadge" />
            <span className="text-xl font-medium">
              ${selectedAlbum[0]?.price || 122}
            </span>
            {selectedAlbum[0]?.unitInfo && (
              <span className="text-teritary">
                /{selectedAlbum[0]?.unitInfo || "unit"}
              </span>
            )}
          </div>
        </div>
      </button>
      <div className="flex flex-col">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={SG1}
                alt={"Gardener"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex flex-col gap-2">
              <div className="flex items-center justify-center w-32 rounded-[4px] py-1 gap-2 bg-premiumgreen">
                <Icons variant="SuperGrow" />
                <span className="text-sm text-primary font-medium">
                  Super Grower
                </span>
              </div>
              <p className="text-2xl font-semibold">
                {selectedAlbum[0]?.name || "Eko Susiloanto"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100">
              <Share2 className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button className="p-2 bg-[rgba(255,255,255,0.8)] rounded-lg hover:bg-gray-100">
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              className="text-sm rounded-lg bg-primary px-12 font-semibold py-2 text-white hover:bg-green-500"
              onClick={() => navigate(INBOX)}
            >
              Connect
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="w-full transition-all duration-300 ease-in ">
            <div className="grid grid-cols-1 gap-5 pb-4 mb-10 tabsm:grid-cols-2 tabxll:grid-cols-3 xl:grid-cols-4">
              {currentProducts.map((product: any, index: any) => (
                <div
                  className="flex items-center justify-center tabsm:justify-start sm:items-start"
                  key={index}
                >
                  <ViewAllCards />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-3 py-4">
            <Pagination
              id={"type2"}
              currentPage={currentPage}
              totalPages={Math.ceil(products.length / itemsPerPage)}
              onPageChange={handlePageChange}
              displayRange={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
