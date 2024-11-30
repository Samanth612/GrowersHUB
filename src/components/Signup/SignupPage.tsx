import React, { useState } from "react";
import Icons from "../../Utilities/Icons";
import OTPVerification from "../VerifyOTP";

const SignupPage: React.FC = () => {
  const [verifyAccount, setVerifyAccount] = useState(false);
  return (
    <>
      {verifyAccount ? (
        <OTPVerification placeholder="Account" />
      ) : (
        <div className="">
          <h1 className="text-4xl font-bold mb-8">Sign Up</h1>

          <form className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full p-4 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Email/User ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter registered email"
                  className="w-full p-4 pl-12 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
                />
                <span className="absolute left-3 top-[18px] text-teritary">
                  <Icons variant="Email" />
                </span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Your Zip code
              </label>
              <input
                type="text"
                placeholder="Enter 5 digit zip code"
                className="w-full p-4 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
              />
              <p className="text-sm text-gray-500 mt-1">
                This would help us find nearby services
              </p>
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Address <span className="text-teritary">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="House no./Street name/Building"
                className="w-full p-4 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full p-4 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-secondary">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter Password"
                className="w-full p-4 rounded-lg border placeholder:text-teritary border-[#DBD8D8] bg-white focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white text-xl font-medium p-4 rounded-lg hover:bg-green-500 transition-colors"
              onClick={() => {
                setVerifyAccount(true);
              }}
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
