import React from "react";
import Header from "../Header";
import ProductListings from "./ProductListing";
import Dashboard from "../Chat/Dashboard";

const SellersDashboardLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Dashboard>
        <ProductListings />
      </Dashboard>
    </div>
  );
};

export default SellersDashboardLayout;
