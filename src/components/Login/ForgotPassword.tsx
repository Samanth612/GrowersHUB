import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Icons from "../../Utilities/Icons";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../VerifyOTP";
import axios from "axios";
import { CONFIG } from "../../config";
import { LOGIN } from "../../Utilities/constantLinks";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/auth/forgot-password`,
        {
          email,
        }
      );

      if (response.data?.success) {
        setSuccessMessage("Password reset link sent to your email.");
        setVerifyOTP(true);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      {verifyOTP ? (
        <OTPVerification placeholder="OTP" email={email} />
      ) : (
        <div>
          <div className="mb-8">
            <button
              className="flex items-center text-secondary"
              onClick={() => {
                scrollTo(0, 0);
                navigate(LOGIN);
              }}
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
                <span className="absolute left-3 top-3.5 text-tertiary">
                  <Icons variant="Email" />
                </span>
                <input
                  type="email"
                  placeholder="Enter registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg text-secondary placeholder:text-tertiary focus:outline-none focus:border-primary"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full font-medium text-xl bg-primary text-white py-3 rounded-lg hover:bg-green-500 transition-colors"
            >
              Send
            </button>
          </form>

          {successMessage && (
            <p className="text-green-500 text-sm mt-4">{successMessage}</p>
          )}
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
