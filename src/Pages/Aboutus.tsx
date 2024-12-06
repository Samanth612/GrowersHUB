import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import About from "../components/About/About";
import BecomeSeller from "../components/BecomeSeller";
import Footer from "../components/Footer";

const Aboutus: React.FC = () => {
  return (
    <div>
      <Header />
      <Title title={"About Us"} />
      <About />
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default Aboutus;
