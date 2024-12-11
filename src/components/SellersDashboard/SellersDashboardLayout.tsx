import React, { useState } from "react";
import Header from "../Header";
import ProductListings from "./ProductListing";
import Dashboard from "../Chat/Dashboard";
import ListProduct from "./Listaproduct";

const SellersDashboardLayout: React.FC = () => {
  const [uploadButtonClicked, setuploadButtonClicked] = useState(true);

  return (
    <div>
      <Header />
      <Dashboard>
        {uploadButtonClicked ? (
          <ListProduct setuploadButtonClicked={setuploadButtonClicked} />
        ) : (
          <ProductListings />
        )}
      </Dashboard>
    </div>
  );
};

export default SellersDashboardLayout;
