import React from "react";
import PricingSection from "./PricingSection";

const Subscriptions: React.FC = () => {
  return (
    <div className="max-w-full min-h-[88vh] mx-auto bg-white">
      <div className="flex items-center justify-between py-6 px-6 lg:px-12 border-b shadow-inner">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Subscription</h1>
        </div>
      </div>
      <div>
        <PricingSection />
      </div>
    </div>
  );
};

export default Subscriptions;
