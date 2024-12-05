import React, { useEffect, useState } from "react";
import JP1 from "../assets/JP1.jpg";
import JP2 from "../assets/JP2.jpg";
import JP3 from "../assets/JP3.jpg";
import JP4 from "../assets/JP4.jpg";
import SG1 from "../assets/SG1.jpg";
import Icons from "../Utilities/Icons";
import Pagination from "../Utilities/Pagination";
import { ArrowLeft } from "lucide-react";
import CarouselCard from "../Utilities/CarouselCard";
import { useNavigate } from "react-router-dom";

const ViewSellersCard: React.FC = () => {
  const products = [
    {
      title: "Crassula small leaf plant",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
    },
    {
      title: "Lemon",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
    },
    {
      title: "Mint",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP3,
    },
    {
      title: "Betel leaf plants",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "unit",
      stock: "1 Unit left",
      image: JP4,
    },
    {
      title: "Crassula small leaf plant (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
    },
    {
      title: "Lemon (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
    },
    {
      title: "Lemon",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
    },
    {
      title: "Mint",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP3,
    },
    {
      title: "Betel leaf plants",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "unit",
      stock: "1 Unit left",
      image: JP4,
    },
    {
      title: "Crassula small leaf plant (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
    },
    {
      title: "Lemon (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
    },
  ];

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

  useEffect(() => {
    if (window?.innerWidth < 1490 && window?.innerWidth >= 1000) {
      setItemsPerPage(9);
    } else {
      setItemsPerPage(8);
    }
  }, []);

  return (
    <div className="px-6 lg:px-20 py-12 bg-white">
      <button
        className="flex items-center text-secondary mb-12 gap-3"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span className="font-semibold">Back</span>
      </button>
      <div className="flex flex-col">
        <div className="mb-12 flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={SG1}
              alt={"Gardener"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4 flex flex-col gap-2">
            <div className="flex items-center justify-center w-32 rounded-[4px] py-1 gap-2 bg-premiumgreen">
              {/* <div className="w-2 h-2 bg-green-600 rounded-full" /> */}
              <Icons variant="SuperGrow" />
              <span className="text-sm text-primary font-medium">
                Super Grower
              </span>
            </div>
            <p className="text-2xl font-semibold">Eko Susiloanto</p>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="w-full transition-all duration-300 ease-in ">
            <div className="grid grid-cols-1 gap-5 pb-4 mb-10 tabsm:grid-cols-2 tabxll:grid-cols-3 xl:grid-cols-4">
              {currentProducts.map((product, index) => (
                <div
                  className="flex items-center justify-center tabsm:justify-start sm:items-start"
                  key={index}
                >
                  <CarouselCard {...product} />
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

export default ViewSellersCard;
