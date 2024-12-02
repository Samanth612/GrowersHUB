import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import AllSellers from "./AllSellers";
import BecomeSeller from "../BecomeSeller";
import Title from "../Title";
import FAQSection from "../FAQ's";
import Product from "./Product";

const ProductDetails: React.FC = () => {
  return (
    <div>
      <Header />
      <Title title={"Product"} description={"Marble Queen Pothos"} />
      <Product />
      <FAQSection />
      <AllSellers />
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default ProductDetails;
