import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import About from "../components/About/About";
import BecomeSeller from "../components/BecomeSeller";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Aboutus: React.FC = () => {
  const userData = useSelector((state: any) => state.userData.data);

  return (
    <div>
      <Header />
      <Title title={"About Us"} />
      <About />
      {userData && !userData?.isSeller && <BecomeSeller />}
      <Footer />
    </div>
  );
};

export default Aboutus;
