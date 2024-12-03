import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ProductFilterBar from "./ProductFilters";
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
      <AllSellers />
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default Products;
