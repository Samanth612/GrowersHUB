import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import MissionSection from "../components/MissionSection";
import JourneySection from "../components/JourneySection";
import Footer from "../components/Footer";
import Marketplace from "../components/Marketplace";
import MeetOurGardeners from "../components/MeetOurGardeners";
import { useSelector } from "react-redux";
import BecomeSeller from "../components/BecomeSeller";

const Home: React.FC = () => {
  const AuthReducer = useSelector((Data: any) => Data.AuthReducer);
  console.log(AuthReducer, "AUth");

  return (
    <div className="font-jost">
      <Header />
      <HeroSection />
      <MissionSection />
      <JourneySection />
      <MeetOurGardeners />
      <Marketplace />
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default Home;
