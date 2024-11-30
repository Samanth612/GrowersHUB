import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import GardenMarketplace from "./GardenerMarketPlace";
import ProductFilterBar from "./ProductFilters";
import BestSellers from "./BestSellers";
import AllSellers from "./AllSellers";
import BecomeSeller from "../BecomeSeller";

const Products: React.FC = () => {
  return (
    <div>
      <Header />
      <header className="flex items-center justify-start w-full h-[184px] bg-premiumgray">
        <div className="flex items-center max-w-7xl px-4 sm:px-6 lg:px-28">
          <div className="flex items-center h-16">
            <h1 className="text-6xl font-extrabold text-secondary">
              Marketplace
            </h1>
            <div className="mx-6 h-10 w-px bg-black" />
            <p className="font-normal text-xl text-black">
              Find the perfect plant for your space
            </p>
          </div>
        </div>
      </header>
      <ProductFilterBar />
      <GardenMarketplace />
      <BestSellers />
      <AllSellers />
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default Products;
