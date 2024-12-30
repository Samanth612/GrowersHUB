import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import BecomeSeller from "../BecomeSeller";
import ViewSellersCard from "../ViewSellersCard";
import ProductDetailsSection from "../ProductDetailsSection";
import { useSelector } from "react-redux";

const ViewSellersGarden: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const userData = useSelector((state: any) => state.userData.data);

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
      {userData && !userData?.isSeller && <BecomeSeller />}
      <Footer />
    </div>
  );
};

export default ViewSellersGarden;
