import React, { useEffect, useState } from "react";
import JP1 from "../../assets/JP1.jpg";
import JP2 from "../../assets/JP2.jpg";
import JP3 from "../../assets/JP3.jpg";
import JP4 from "../../assets/JP4.jpg";
import SG1 from "../../assets/SG1.jpg";
import CarouselCard from "../../Utilities/CarouselCard";
import Pagination from "../../Utilities/Pagination";

interface CommunityDetailsProps {
  setSelectedAlbum: any;
}

const CommunityDetails: React.FC<CommunityDetailsProps> = ({
  setSelectedAlbum,
}) => {
  const products = [
    {
      title: "Crassula small leaf plant",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Lemon",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Mint",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP3,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Betel leaf plants",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "unit",
      stock: "1 Unit left",
      image: JP4,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Crassula small leaf plant (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Lemon (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Lemon",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Mint",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP3,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Betel leaf plants",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "unit",
      stock: "1 Unit left",
      image: JP4,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Crassula small leaf plant (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
    {
      title: "Lemon (Repeat)",
      location: "San Ramon, California, 20miles away",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      products: [
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
        { image: JP1 },
      ],
    },
  ];

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
    <div className="px-6 lg:px-12 py-12 bg-white">
      <div className="flex flex-col justify-between h-full">
        <div className="w-full transition-all duration-300 ease-in ">
          <div className="grid grid-cols-1 gap-5 pb-4 mb-10 tabsm:grid-cols-2 tabxll:grid-cols-3 xl:grid-cols-4">
            {currentProducts.map((product, index) => (
              <div
                className="flex items-center justify-center tabsm:justify-start sm:items-start"
                key={index}
              >
                <CarouselCard
                  {...product}
                  setSelectedAlbum={setSelectedAlbum}
                />
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
  );
};

export default CommunityDetails;
