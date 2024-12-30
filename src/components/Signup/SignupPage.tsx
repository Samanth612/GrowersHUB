import React, { useState } from "react";
import axios from "axios";
import Icons from "../../Utilities/Icons";
import OTPVerification from "../VerifyOTP";
import { CONFIG } from "../../config";
import toast from "react-hot-toast";

const SignupPage: React.FC = () => {
  const [verifyAccount, setVerifyAccount] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    zipcode: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.zipcode) newErrors.zipcode = "Zip Code is required.";
    else if (!/^\d{5}$/.test(formData.zipcode))
      newErrors.zipcode = "Zip Code must be 6 digits.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const coordinatesResponse = await axios.get(
        `${CONFIG?.API_ENDPOINT}/auth/coordinates`,
        {
          params: {
            address: formData.address,
          },
        }
      );

      const latitude = coordinatesResponse?.data?.data?.location?.lat;
      const longitude = coordinatesResponse?.data?.data?.location?.lng;

      if (!latitude || !longitude) {
        throw new Error("Failed to get coordinates");
      }

      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        location: {
          address: formData.address,
          latitude: latitude || "80",
          longitude: longitude || "80",
        },
        zipcode: formData.zipcode,
      };

      const signupResponse = await axios.post(
        `${CONFIG?.API_ENDPOINT}/auth/signup`,
        payload
      );

      setVerifyAccount(true);
      console.log("Signup successful:", signupResponse.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          (error.response?.data?.message || "An error occurred") as string
        );
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error:", error);
    }
  };

  return (
    <>
      {verifyAccount ? (
        <OTPVerification placeholder="Account" email={formData.email} />
      ) : (
        <div className="">
          <h1 className="text-4xl font-bold mb-8">Sign Up</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                className="w-full p-4 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Email/User ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter registered email"
                  className="w-full p-4 pl-12 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                />
                <span className="absolute left-3 top-[18px] text-teritary">
                  <Icons variant="Email" />
                </span>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Your Zip code
              </label>
              <input
                type="text"
                name="zipcode"
                maxLength={5}
                placeholder="Enter 5 digit zip code"
                className="w-full p-4 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
                value={formData.zipcode}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 mt-1">
                This would help us find nearby services
              </p>
              {errors.zipcode && (
                <p className="text-red-500 text-sm">{errors.zipcode}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="House no./Street name/Building"
                className="w-full p-4 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full p-4 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                className="w-full p-4 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white text-xl font-medium p-4 rounded-lg hover:bg-green-500 transition-colors"
            >
              Sign Up
            </button>

            <p className="text-start text-secondary">
              Already Have an account ?{" "}
              <a href="/login" className="text-primary font-medium">
                &nbsp; Log In
              </a>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupPage;
