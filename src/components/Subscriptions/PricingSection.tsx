// PricingSection.tsx
import React from "react";
import PricingCard from "./PricingCard";
import { loadStripe } from "@stripe/stripe-js";
import { CONFIG } from "../../config";
import { useSelector } from "react-redux";
import axios from "axios";

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
  const userData = useSelector((state: any) => state.userData.data);

  const handleSubscription = async () => {
    const stripePromise: any = await loadStripe(`${CONFIG?.STRIPE_KEY}`);
    const response: any = await axios.post(
      `${CONFIG?.API_ENDPOINT}/user/stripe/create-stripe-session-subscription`,
      {
        auth0UserId: userData?.userId,
        userEmail: userData?.email,
      },
      {
        headers: {
          Authorization: `Bearer ${userData?.access_token}`,
          "Content-Type": "Application/JSON",
        },
      }
    );

    if (response.status === 409) {
      window.location.href = response?.data?.redirectUrl; // redirect to billing portal if user is already subscribed
    } else {
      stripePromise.redirectToCheckout({
        sessionId: response?.data?.id,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-6 lg:mx-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {pricingData.map((plan, index) => (
          <PricingCard
            key={index}
            {...plan}
            handleSubscription={handleSubscription}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
