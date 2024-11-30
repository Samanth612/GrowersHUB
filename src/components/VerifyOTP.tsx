import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PasswordResetForm from "./Login/ResetPassword";

interface OTPVerificationProps {
  placeholder: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ placeholder }) => {
  const navigate = useNavigate();
  const [ResetPassword, setRestPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

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
            <p className="text-md font-normal text-teritary">
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

            {/* Verify Button */}
            <button
              className="w-[72%] bg-primary text-white py-3 rounded-lg font-medium hover:bg-green-500 transition-colors"
              onClick={() => setRestPassword(true)}
            >
              Verify
            </button>

            {/* Resend Link */}
            <p className="text-sm text-center ml-2 text-secondary">
              Didn't receive code ?{" "}
              <a href="#" className="text-primary">
                Resend OTP
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default OTPVerification;
