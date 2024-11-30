import React from "react";
import { useNavigate } from "react-router-dom";
import { HOME } from "../Utilities/constantLinks";
import Icons from "../Utilities/Icons";

const Aboutus: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute flex flex-col w-full font-jost pb-32 mt-16 text-justify">
      <button
        className="ml-12 w-[100px] flex items-center "
        onClick={() => {
          navigate(HOME);
        }}
      >
        <Icons variant="backArrow" />
      </button>
      <div className="p-1 mx-8 mt-4 text-2xl font-bold text-center">
        ABOUT US
      </div>
      <div className="mx-12 mt-8 border-2 border-black border-solid md:mx-32"></div>
      <div className="mx-12 mt-8 text-center text-sm text-lightGray md:mx-32">
        <i>
          Last Updated November 18<sup>th</sup>, 2024
        </i>
      </div>
      <div className="px-14 md:px-28 lg:px-32 pt-10">
        <div className="ak-renderer-document">
          <p
            className="pb-4 font-rajdhani text-2xl font-bold"
            data-renderer-start-pos="12"
          >
            <strong data-renderer-mark="true">ABOUT US</strong> 
          </p>

          <p className="pb-4 font-bold text-sm" data-renderer-start-pos="1055">
            <strong data-renderer-mark="true">1. Purpose</strong>
          </p>
          <p
            className="pb-4 font-medium text-sm  text-lightGray"
            data-renderer-start-pos="1099"
          >
            1.1<strong data-renderer-mark="true"> </strong>At Growers Hub, our
            purpose is to cultivate a thriving community centered around the
            love of gardening and the appreciation for nature's bounty. We
            believe in fostering connections between growers, enthusiasts, and
            nature lovers to create a sustainable ecosystem where every plant
            and its produce find purpose and appreciation. 
          </p>

          <p className="pb-4 font-bold text-sm" data-renderer-start-pos="2830">
            <strong data-renderer-mark="true">2. Mission Statement</strong> 
          </p>
          <p
            className="pb-4 font-medium text-sm text-lightGray"
            data-renderer-start-pos="2847"
          >
            2.1 Our mission at Growers Hub is to provide a dynamic platform
            where individuals across the United States can seamlessly buy, sell,
            and share plants, produce, and all things garden-related. By
            leveraging technology, community, and a passion for gardening, we
            aim to empower growers nationwide to connect, exchange knowledge,
            and foster a culture of sustainability. Together, we envision a
            future where the Earth's abundance is cherished, and nothing from
            nature's harvest goes to waste.  
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
