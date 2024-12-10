import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PasswordResetForm from "./Login/ResetPassword";

interface OTPVerificationProps {
  placeholder: string;
  email: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  placeholder,
  email,
}) => {
  const navigate = useNavigate();
  const [ResetPassword, setResetPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (element: any, index: any) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e: any, index: any) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = e.target.previousSibling;
      if (prev) {
        prev.focus();
      }
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const otpCode = otp.join(""); // Combine OTP array into a string
      const response = await axios.post(
        "http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/auth/verify-email-otp",
        {
          email: email,
          otp: otpCode,
        }
      );

      if (response.data.status) {
        setSuccessMessage("OTP verified successfully!");
        setResetPassword(true);
      } else {
        setError(response.data.message || "OTP verification failed.");
      }
    } catch (err) {
      setError(
        (err as any).response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setResendLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("/api/resend-otp", {
        email: email,
      });

      if (response.data.status) {
        setSuccessMessage("OTP resent successfully! Please check your email.");
      } else {
        setError(response.data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      setError(
        (err as any).response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      {ResetPassword ? (
        <PasswordResetForm />
      ) : (
        <div>
          {/* Back Button */}
          <button
            className="flex items-center text-secondary mb-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>

          {/* Main Content */}
          <div className="flex flex-col items-start space-y-6">
            <h1 className="text-4xl font-medium text-secondary">
              Verify {`${placeholder}`}
            </h1>
            <p className="text-md font-normal text-tertiary">
              Enter code sent to your email
            </p>

            {/* OTP Input Group */}
            <div className="flex justify-around gap-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            {/* Error and Success Messages */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            {successMessage && (
              <p className="text-sm text-green-500 text-center">
                {successMessage}
              </p>
            )}

            {/* Verify Button */}
            <button
              className={`w-[72%] bg-primary text-white py-3 rounded-lg font-medium hover:bg-green-500 transition-colors ${
                loading ? "opacity-50" : ""
              }`}
              onClick={verifyOTP}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>

            {/* Resend Link */}
            <p className="text-sm text-center ml-2 text-secondary">
              Didn't receive code?{" "}
              <button
                onClick={resendOTP}
                className={`text-primary ${resendLoading ? "opacity-50" : ""}`}
                disabled={resendLoading}
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default OTPVerification;
