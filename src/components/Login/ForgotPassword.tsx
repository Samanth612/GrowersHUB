import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Icons from "../../Utilities/Icons";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../VerifyOTP";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [verifyOTP, sendVerifyOTP] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      {verifyOTP ? (
        <OTPVerification placeholder="OTP" />
      ) : (
        <div>
          <div className="mb-8">
            <button
              className="flex items-center text-secondary"
              onClick={() => navigate("/login")}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Login
            </button>
          </div>

          <h1 className="text-4xl font-semibold mb-4 text-secondary">
            Forgot Password?
          </h1>
          <p className="text-teritary text-lg font-light mb-8">
            You will receive the link to reset password on your registered
            email.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-secondary font-medium mb-2">
                Email/User ID
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-teritary">
                  <Icons variant="Email" />
                </span>
                <input
                  type="email"
                  placeholder="Enter registered email"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg text-secondary placeholder:text-teritary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full font-medium text-xl bg-primary text-white py-3 rounded-lg hover:bg-green-500 transition-colors"
              onClick={() => sendVerifyOTP(true)}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
