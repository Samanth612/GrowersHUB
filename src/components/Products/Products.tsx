import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import GardenMarketplace from "./GardenerMarketPlace";
import ProductFilterBar from "./ProductFilters";
import BestSellers from "./BestSellers";
import AllSellers from "./AllSellers";
import BecomeSeller from "../BecomeSeller";
import Title from "../Title";

const Products: React.FC = () => {
  return (
    <div>
      <Header />
      <Title
        title={"Marketplace"}
        description={"Find the perfect plant for your space"}
      />
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
