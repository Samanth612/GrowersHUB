import React, { useState } from "react";
import axios from "axios";
import { CONFIG } from "../../config";
import logo from "../../assets/FooterLogo.png";
import success from "../../assets/Login/Success.gif";

interface StripeCheckoutProps {
  setPaymentModal: any;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ setPaymentModal }) => {
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [priceId, setPriceId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [openModal, setOpenModal] = useState("Create_Customer");

  const handleCreateCustomer = async () => {
    setOpenModal("Create Subscription");

    try {
      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/stripe/create-customer`,
        { email, paymentMethod }
      );
      setCustomerId(response.data.customer.id);
      alert("Customer created successfully!");
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const handleCreateSubscription = async () => {
    setOpenModal("Payment");
    setTimeout(() => {
      setPaymentModal(false);
    }, 3000);
    try {
      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/stripe/create-subscription`,
        { customerId, priceId }
      );
      alert("Subscription created successfully!");
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };

  const handleCheckout = async () => {
    setPaymentModal(false);

    try {
      const successUrl = `${CONFIG?.API_ENDPOINT}/success`;
      const cancelUrl = `${CONFIG?.API_ENDPOINT}/cancel`;
      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/stripe/create-checkout-session`,
        {
          customerId,
          priceId,
          successUrl,
          cancelUrl,
        }
      );
      setSessionId(response.data.sessionId);
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-xl w-full bg-white p-10 border rounded-lg">
      <div className="flex flex-col items-center justify-center gap-1">
        <img
          src={logo}
          alt="Logo"
          className="h-14"
          onClick={() => {
            scrollTo(0, 0);
          }}
        />
        <span>Payment Modal</span>
      </div>
      {openModal === "Create_Customer" && (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === " " && e.preventDefault()}
            placeholder="Enter email"
            className="w-full p-3 pl-4 rounded-lg border border-[#DBD8D8] focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            onKeyDown={(e) => e.key === " " && e.preventDefault()}
            placeholder="Payment Method"
            className="w-full p-3 pl-4 rounded-lg border border-[#DBD8D8] focus:outline-none focus:border-primary"
          />
          <div className="flex items-center justify-center">
            <button
              onClick={handleCreateCustomer}
              className="px-6 py-3 w-52 font-medium border rounded-lg bg-primary hover:bg-green-500 text-white text-lg"
            >
              Create Customer
            </button>
          </div>
        </>
      )}
      {openModal === "Create Subscription" && (
        <>
          {" "}
          <input
            type="text"
            value={priceId}
            onChange={(e) => setPriceId(e.target.value)}
            onKeyDown={(e) => e.key === " " && e.preventDefault()}
            placeholder="Price ID"
            className="w-full p-3 pl-4 rounded-lg border border-[#DBD8D8] focus:outline-none focus:border-primary"
          />
          <div className="flex items-center justify-center">
            <button
              onClick={handleCreateSubscription}
              className="px-6 py-3 w-52 font-medium border rounded-lg bg-primary hover:bg-green-500 text-white text-lg"
            >
              Create Subscription
            </button>
          </div>
        </>
      )}
      {openModal === "Payment" && (
        <div className="flex flex-col items-center gap-10">
          <img src={success} alt="Success" className="w-40 h-40" />

          <div className="flex items-center justify-center">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 w-52 font-medium border rounded-lg bg-primary hover:bg-green-500 text-white text-lg whitespace-nowrap"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StripeCheckout;
