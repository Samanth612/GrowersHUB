import React, { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import MissionSection from "../components/MissionSection";
import JourneySection from "../components/JourneySection";
import Footer from "../components/Footer";
import Marketplace from "../components/Marketplace";
import MeetOurGardeners from "../components/MeetOurGardeners";
import { useSelector } from "react-redux";
import BecomeSeller from "../components/BecomeSeller";
import ProductDetailsSection from "../components/ProductDetailsSection";

const Home: React.FC = () => {
  const AuthReducer = useSelector((Data: any) => Data.AuthReducer);
  console.log(AuthReducer);
  const [selectedAlbum, setSelectedAlbum] = useState([]);

  return (
    <div className="font-jost">
      <Header />
      {selectedAlbum?.length > 0 ? (
        <ProductDetailsSection
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />
      ) : (
        <>
          <HeroSection />
          <MissionSection />
          <JourneySection />
          <MeetOurGardeners setSelectedAlbum={setSelectedAlbum} />
          <Marketplace />
        </>
      )}
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default Home;
