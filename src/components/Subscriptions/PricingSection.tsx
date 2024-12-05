// PricingSection.tsx
import React from "react";
import PricingCard from "./PricingCard";

type Feature = string | { highlight: string };

type PricingData = {
  tier: string;
  price: string;
  discount?: string;
  forType: string;
  features: Feature[];
  buttonText: string;
  isRecommended?: boolean;
};

const PricingSection: React.FC = () => {
  const pricingData: PricingData[] = [
    {
      tier: "Free",
      price: "0",
      forType: "For Beginners",
      features: ["Access to 5 Albums", "Connect with fellow gardeners"],
      buttonText: "Active Plan",
    },
    {
      tier: "Pro",
      price: "39",
      discount: "-15%",
      forType: "For Gardeners",
      features: [
        { highlight: "Unlimited Albums" },
        "Connect with fellow gardeners",
        "Be active part of community",
      ],
      buttonText: "Increase Limit",
    },
    {
      tier: "Super Seller",
      price: "59",
      discount: "-15%",
      forType: "For Gardeners",
      features: [
        "Become a Certified Seller",
        { highlight: "Unlimited Albums" },
        "Connect with fellow gardeners",
        "Be active part of community",
      ],
      buttonText: "Become a Seller",
      isRecommended: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {pricingData.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
