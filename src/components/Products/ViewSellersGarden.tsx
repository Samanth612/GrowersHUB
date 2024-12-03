import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import BecomeSeller from "../BecomeSeller";
import ViewSellersCard from "../ViewSellersCard";

const ViewSellersGarden: React.FC = () => {
  return (
    <div>
      <Header />
      <ViewSellersCard />
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default ViewSellersGarden;
