// PricingSection.tsx
import React from "react";
import PricingCard from "./PricingCard";
import { loadStripe } from "@stripe/stripe-js";
import { CONFIG } from "../../config";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

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
   try {
    const response: any = await axios.post(
      `${CONFIG?.API_ENDPOINT}/user/stripe/create-stripe-session-subscription`,
      {
        type: "Pro",
        userEmail: "divya@gmmaiail.io",
      },
      {
        headers: {
          Authorization: `Bearer ${userData?.access_token}`,
          "Content-Type": "Application/JSON",
        },
      }
    );
    console.log("🚀 ~ handleSubscription ~ response:", response.data)
    if(response.data.statusCode == 409){
          console.log("🚀 ~ handleCheckout ~ response.data.:", response.data)
          toast.error(response?.data?.message);
        }
    if (response.status !== 409) { 
      stripePromise.redirectToCheckout({
        sessionId: response?.data?.id,
      });
    }
   } catch (error : any) {
    console.log("🚀 ~ handleSubscription ~ error:", error)
    toast.error(error?.response?.data?.message)
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
