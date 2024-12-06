import React from "react";
import Aboutus from "../../assets/Abouus.png";

const About: React.FC = () => {
  return (
    <div className="bg-white py-12 px-6 lg:px-12">
      {/* Purpose Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-secondary mb-4">Purpose</h2>
        <p className="text-teritary w-[86%] text-xl leading-relaxed">
          At Growers Hub, our purpose is to cultivate a thriving community
          centered around the love of gardening and the appreciation for
          nature’s bounty. We believe in fostering connections between growers,
          enthusiasts, and nature lovers to create a sustainable ecosystem where
          every plant and its produce find purpose and appreciation.
        </p>
      </div>

      {/* Image */}
      <div className="mb-12">
        <img
          src={Aboutus} // Replace with the actual image path
          alt="A greenhouse with plants"
          className="w-full max-h-72 h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Mission Statement Section */}
      <div>
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Mission Statement
        </h2>
        <p className="text-teritary w-[86%] text-xl leading-relaxed">
          Our mission at Growers Hub is to provide a dynamic platform where
          individuals across the United States can seamlessly buy, sell, and
          share plants, produce, and all things garden-related. By leveraging
          technology, community, and a passion for gardening, we aim to empower
          growers nationwide to connect, exchange knowledge, and foster a
          culture of sustainability. Together, we envision a future where the
          Earth’s abundance is cherished, and nothing from nature’s harvest goes
          to waste.
        </p>
      </div>
    </div>
  );
};

export default About;
