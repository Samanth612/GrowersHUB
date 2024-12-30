import React, { useState } from "react";
import StripeCheckout from "../Payment/StripeCheckout";
import Modal from "../Modal";

type Feature = string | { highlight: string };

type PricingCardProps = {
  tier: string;
  price: string;
  discount?: string;
  forType: string;
  features: Feature[];
  buttonText: string;
  isRecommended?: boolean;
  handleSubscription: any;
};

const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  price,
  discount,
  forType,
  features,
  buttonText,
  isRecommended,
  handleSubscription,
}) => {
  const [openPaymentModal, setPaymentModal] = useState(false);
  const handleButtonClick = () => {
    if (buttonText === "Increase Limit") {
      setPaymentModal(true);
    }
  };

  if (openPaymentModal) {
    return (
      <Modal
        children={<StripeCheckout setPaymentModal={setPaymentModal} />}
        onClose={() => setPaymentModal(false)}
      />
    );
  }

  return (
    <div className="p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium">{tier}</h2>
          {isRecommended && (
            <span className="px-2 py-1 text-sm text-green-700 bg-green-50 rounded">
              Recommended
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-4xl font-medium">${price}</span>
          {discount && (
            <span className="px-2 py-1 text-sm bg-gray-100 rounded">
              {discount}
            </span>
          )}
        </div>
        <p className="text-teritary mt-1">per user/month, billed annually</p>
      </div>

      <div className="mb-4">
        <p className="font-medium mb-4">{forType}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-primary mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-secondary">
                {typeof feature === "string" ? (
                  feature
                ) : (
                  <>
                    Access to{" "}
                    <span className="font-bold">{feature.highlight}</span>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`flex items-center justify-center gap-2 mt-auto w-full py-2 px-4 rounded-lg font-medium ${
          buttonText === "Become a Seller" || buttonText === "Increase Limit"
            ? "bg-primary text-white hover:bg-green-500"
            : "border border-[#EDEDED] rounded-lg bg-white text-secondary hover:bg-gray-200"
        }`}
        onClick={() => {
          buttonText === "Increase Limit" && handleSubscription();
        }}
      >
        {buttonText === "Active Plan" && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_543_20656)">
              <rect
                x="0.238281"
                y="0.214844"
                width="16.9185"
                height="16.9185"
                rx="2.70696"
                fill="#F2F2F2"
              />
              <g clipPath="url(#clip1_543_20656)">
                <path
                  d="M4.58594 8.67357L7.52318 11.6108L13.3977 5.73633"
                  stroke="#AFAFAF"
                  strokeWidth="1.35348"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_543_20656">
                <rect
                  x="0.238281"
                  y="0.214844"
                  width="16.9185"
                  height="16.9185"
                  rx="2.70696"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip1_543_20656">
                <rect
                  width="14.0988"
                  height="14.0988"
                  fill="white"
                  transform="translate(1.64844 1.62305)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
