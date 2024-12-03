import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import BecomeSeller from "../BecomeSeller";
import Title from "../Title";
import FAQSection from "../FAQ's";
import Product from "./Product";
import BestSellers from "./BestSellers";

const ProductDetails: React.FC = () => {
  return (
    <div>
      <Header />
      <Title title={"Product"} description={"Marble Queen Pothos"} />
      <Product />
      <FAQSection />
      <BestSellers />
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default ProductDetails;
