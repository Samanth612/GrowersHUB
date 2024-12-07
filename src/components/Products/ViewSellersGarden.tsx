import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import BecomeSeller from "../BecomeSeller";
import ViewSellersCard from "../ViewSellersCard";
import ProductDetailsSection from "../ProductDetailsSection";

const ViewSellersGarden: React.FC = () => {
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
        <ViewSellersCard setSelectedAlbum={setSelectedAlbum} />
      )}
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default ViewSellersGarden;
