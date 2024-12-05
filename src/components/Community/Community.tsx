import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import BecomeSeller from "../BecomeSeller";
import Title from "../Title";
import ProductFilterBar from "../Products/ProductFilters";
import CommunityDetails from "./CommunityDetails";
import CommunityRBAC from "./CommunityRBAC";

const CommunityLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Title
        title={"Community"}
        description={"Meet Fellow gardeners and share your journey"}
      />
      <CommunityRBAC />
      <ProductFilterBar />
      <CommunityDetails />
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default CommunityLayout;
