import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import BecomeSeller from "../BecomeSeller";
import Title from "../Title";
import ProductFilterBar from "../Products/ProductFilters";
import CommunityDetails from "./CommunityDetails";
import CommunityRBAC from "./CommunityRBAC";
import ProductDetailsSection from "../ProductDetailsSection";

const CommunityLayout: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState([]);

  return (
    <div>
      <Header />
      {selectedAlbum?.length > 0 ? (
        <ProductDetailsSection
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />
      ) : (
        <>
          <Title
            title={"Community"}
            description={"Meet Fellow gardeners and share your journey"}
          />
          <CommunityRBAC />
          <ProductFilterBar />
          <CommunityDetails setSelectedAlbum={setSelectedAlbum} />
        </>
      )}

      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default CommunityLayout;
