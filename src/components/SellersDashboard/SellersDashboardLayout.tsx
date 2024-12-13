import React, { useState } from "react";
import Header from "../Header";
import ProductListings from "./ProductListing";
import Dashboard from "../Chat/Dashboard";
import ListProduct from "./Listaproduct";

const SellersDashboardLayout: React.FC = () => {
  const [uploadButtonClicked, setuploadButtonClicked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [FaqSection, setFaqSection] = useState(false);
  // FaqSection of it's true open FAQ's section
  return (
    <div>
      <Header />
      <Dashboard>
        {uploadButtonClicked ? (
          <ListProduct
            setuploadButtonClicked={setuploadButtonClicked}
            editing={editing}
            setFaqSection={setFaqSection}
          />
        ) : (
          <ProductListings
            setuploadButtonClicked={setuploadButtonClicked}
            setEditing={setEditing}
          />
        )}
      </Dashboard>
    </div>
  );
};

export default SellersDashboardLayout;
