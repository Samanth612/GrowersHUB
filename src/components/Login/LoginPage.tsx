import React, { useState } from "react";
import axios from "axios";
import Icons from "../../Utilities/Icons";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { CONFIG } from "../../config";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import toast from "react-hot-toast";

interface LoginPageProps {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  setLoginSuccess: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  showPassword,
  setShowPassword,
  setLoginSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Helper functions
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const navigateUrl = (url: string) => {
    window.location.href = url;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email) return setError("Email is required.");
    if (!validateEmail(email)) return setError("Invalid email format.");
    if (!password) return setError("Password is required.");

    try {
      setLoading(true);
      const response = await axios.post(`${CONFIG?.API_ENDPOINT}/auth/login`, {
        email,
        password,
      });

      if (response.data.status) {
        setLoginSuccess(true);
        dispatch({
          type: "userData",
          payload: { data: response.data },
        });
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const { credential } = credentialResponse;
    try {
      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/auth/google-signup`,
        { googleToken: credential }
      );
      if (response.data.status) {
        setLoginSuccess(true);
        dispatch({
          type: "userData",
          payload: { data: response.data },
        });
        toast.success("Google login successful");
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed");
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-2 text-secondary">Login</h1>
      <p className="text-teritary mb-8">Login to continue</p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Input */}
        <div>
          <label className="block text-lg font-medium mb-2 text-secondary">
            Email/User ID
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              onKeyDown={(e) => e.key === " " && e.preventDefault()}
              placeholder="Enter registered email"
              className="w-full p-3 pl-10 rounded-lg border border-[#DBD8D8] focus:outline-none focus:border-primary"
            />
            <span className="absolute left-3 top-3.5 text-teritary">
              <Icons variant="Email" />
            </span>
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-lg font-medium mb-2 text-secondary">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleInputChange(setPassword)}
              placeholder="Enter Password"
              className="w-full p-3 pl-10 pr-10 rounded-lg border border-[#DBD8D8] focus:outline-none focus:border-primary"
            />
            <span className="absolute left-3 top-3.5 text-teritary">
              <Icons variant="Password" />
            </span>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Keep Me Logged In */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 border border-primary"
            />
            <span>Keep me logged in</span>
          </label>
          <a href="/forgotpassword" className="text-primary font-medium">
            Forgot password
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-medium text-xl bg-primary text-white p-3 rounded-lg hover:bg-green-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {/* Google OAuth */}
        <div className="text-center text-teritary">Or</div>
        <GoogleOAuthProvider clientId={`${CONFIG?.CLIENT_ID}`}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false} 
            theme="outline" // Customize the button theme
            size="large"    // Customize button size
            width={"100%"}
            text="signin_with" 
          />
        </GoogleOAuthProvider>

        {/* Sign Up Link */}
        <p className="text-start font-medium">
          New User?{" "}
          <a href="/signup" className="text-primary">
            &nbsp;Sign Up
          </a>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
