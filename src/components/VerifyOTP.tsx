import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../Utilities/constantLinks";

interface OTPVerificationProps {
  placeholder: string;
  email: string;
}

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password: string;
  confirmPassword: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  placeholder,
  email,
}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    password: "",
    confirmPassword: "",
  });
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true); // Timer starts when OTP is shown

  // Start countdown
  useEffect(() => {
    let interval: any;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsTimerActive(false); // Stop timer when it reaches 0
    }

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [isTimerActive, timer]);

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
      const isForgotPassword = placeholder === "OTP";

      const endpoint = isForgotPassword
        ? "/auth/reset-password"
        : "/auth/verify-email-otp";

      // Construct the request payload dynamically
      const payload = isForgotPassword
        ? {
            email: email,
            otp: otpCode,
            newPassword: formData?.password,
            confirmPassword: formData?.password,
          }
        : { email: email, otp: otpCode };

      const response = await axios.post(
        `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000${endpoint}`,
        payload
      );

      if (response.data.status || (validateForm() && placeholder === "OTP")) {
        setSuccessMessage("OTP verified successfully!");
        navigate(LOGIN);
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
        setTimer(900); // Reset timer for 15 minutes
        setIsTimerActive(true); // Start the countdown again
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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {
      password: "",
      confirmPassword: "",
    };

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <>
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
          <h1 className="text-4xl font-semibold text-secondary leading-snug">
            {placeholder === "OTP" ? (
              <>
                Verify {placeholder} & <br /> Reset Password
              </>
            ) : (
              `Verify ${placeholder}`
            )}
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

          {placeholder === "OTP" && (
            <form className="w-full">
              <div className="mb-6">
                <label className="block text-secondary font-semibold text-lg mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-teritary"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.password && (
                  <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-secondary font-semibold text-lg mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter Password"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-teritary"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </form>
          )}

          {/* Error and Success Messages */}
          {error && <p className="text-sm text-red-500 text-start">{error}</p>}
          {successMessage && (
            <p className="text-sm text-green-500 text-center">
              {successMessage}
            </p>
          )}

          {/* Verify Button */}
          <button
            className={`w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-green-500 transition-colors ${
              loading ? "opacity-50" : ""
            }`}
            onClick={verifyOTP}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          {/* Resend Link */}
          {isTimerActive ? (
            <p className="text-sm text-center text-teritary">
              Time Remaining: {formatTime(timer)}
            </p>
          ) : (
            <p className="text-sm text-center ml-2 text-secondary">
              Didn't receive code?{" "}
              <button
                onClick={resendOTP}
                className={`text-primary ${
                  resendLoading || isTimerActive ? "opacity-50" : ""
                }`}
                disabled={resendLoading || isTimerActive}
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default OTPVerification;
