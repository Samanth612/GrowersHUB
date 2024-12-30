import React, { useState, useEffect, useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import GardenersCarouselCard from "./GardenersCarouselCard";
import GardenersCard from "./GardenersCard";
import JP1 from "../assets/JP1.jpg";
import JP2 from "../assets/JP2.jpg";
import JP3 from "../assets/JP3.jpg";
import JP4 from "../assets/JP4.jpg";
import SG1 from "../assets/SG1.jpg";
import Modal from "./Modal";
import ShareAlbumModal from "./ShareAlbumModal";

interface GardenersShowcaseProps {
  setSelectedAlbum: any;
  products: any[]; // Add products as a prop
}

const GardenersShowcase: React.FC<GardenersShowcaseProps> = ({
  setSelectedAlbum,
  products,
}) => {
  const staticAlbumProducts = [
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

  const productsToDisplay =
    products?.length > 0
      ? products.map((product: any) => ({
          title: product.title,
          location: product.location,
          price: product.price,
          unitInfo: product.unitInfo,
          stock: product.stock,
          image: product.image,
          id: product.id,
          profileImage: product.profileImage || SG1,
          products: product.products || [],
          name: product.name || "Default Name",
          userId: product.userId,
          isSeller: product.isSeller,
          isWishlisted: product.isWishlisted,
          video: product.video,
        }))
      : staticAlbumProducts;

  // State for the current offset of the products
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectVideo, setSelectedVideo] = useState(null);

  // Ref to the product container to calculate the width of a single product card
  const productContainerRef = useRef<HTMLDivElement | null>(null);

  // Dynamically calculate the width of a product card
  const [productWidth, setProductWidth] = useState(0);

  // Gap size in pixels (based on Tailwind's gap-6)
  const gap = 24;

  useEffect(() => {
    // Calculate product width once the component is mounted
    if (productContainerRef.current) {
      setProductWidth(
        productContainerRef.current.children[0].getBoundingClientRect().width
      );
    }
  }, []);

  // Define the number of products visible at once (4 in this case)
  const visibleCards = 3;

  // Total width of one product card including the gap
  const totalWidthPerCard = productWidth + gap;

  const maxOffset =
    -(productsToDisplay.length - visibleCards) * totalWidthPerCard;

  // Move to the next products
  const nextProducts = () => {
    if (currentOffset > maxOffset) {
      setCurrentOffset(currentOffset - totalWidthPerCard);
    }
  };

  // Move to the previous products
  const prevProducts = () => {
    if (currentOffset < 0) {
      setCurrentOffset(currentOffset + totalWidthPerCard);
    }
  };

  const closeModal = () => setIsModalOpen(false);

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
      <div className="max-w-full mx-6 md:mx-12 py-12">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="text-primary font-medium text-xl mb-2">Community</div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Meet Our Gardeners
          </h1>
          <p className="text-teritary text-lg md:text-2xl w-full lg:w-[54%]">
            Behind every garden is a story. Here at Growers Hub, we celebrate
            our community and share their journeys. Meet our gardeners, hear
            their stories, and see how they've transformed simple spaces into
            thriving gardens.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="justify-end gap-10 mb-6 hidden xl:flex">
          <button
            className={`p-4 rounded-full ${
              currentOffset === 0
                ? "bg-teritary text-white cursor-not-allowed"
                : "bg-primary hover:bg-primary text-white"
            }`}
            onClick={prevProducts}
            disabled={currentOffset === 0}
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button
            className={`p-4 rounded-full ${
              currentOffset <= maxOffset
                ? "bg-teritary text-white cursor-not-allowed"
                : "bg-primary hover:bg-primary text-white"
            }`}
            onClick={nextProducts}
            disabled={currentOffset <= maxOffset}
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cards Grid with Sliding Animation */}
        <div className="overflow-hidden">
          <div
            ref={productContainerRef}
            className="hidden xl:flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${currentOffset}px)`,
            }}
          >
            {productsToDisplay.map((product, index) => (
              <div className="flex-none" key={index}>
                <GardenersCard
                  {...product}
                  setSelectedAlbum={setSelectedAlbum}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedVideo={setSelectedVideo}
                />
              </div>
            ))}
          </div>

          {/* Carousel for mobile */}
          <GardenersCarouselCard
            products={productsToDisplay}
            setSelectedAlbum={setSelectedAlbum}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setSelectedVideo={setSelectedVideo}
          />
        </div>
      </div>
    </>
  );
};

export default GardenersShowcase;
