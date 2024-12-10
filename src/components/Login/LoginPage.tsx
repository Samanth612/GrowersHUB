import React, { useState } from "react";
import axios from "axios";
import Icons from "../../Utilities/Icons";
import { Eye, EyeOff } from "lucide-react";

interface LoginPageProps {
  showPassword: boolean;
  setShowPassword: any;
  setLoginSuccess: any;
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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setError("");

    // Validations
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/auth/login",
        { email, password }
      );

      if (response.data.status) {
        setLoginSuccess(true);
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-2 text-secondary">Login</h1>
      <p className="text-teritary mb-8">Login to continue</p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-lg font-medium mb-2 text-secondary">
            Email/User ID
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter registered email"
              className="w-full p-3 pl-10 rounded-lg border border-[#DBD8D8] focus:outline-none focus:border-primary"
            />
            <span className="absolute left-3 top-3.5 text-teritary">
              <Icons variant="Email" />
            </span>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2 text-secondary">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

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

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-medium text-xl bg-primary text-white p-3 rounded-lg hover:bg-green-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <div className="text-center text-teritary">Or</div>

        <button
          type="button"
          className="w-full flex items-center justify-center font-medium text-xl gap-2 p-3 border-2 border-[#E2E8F0] rounded-lg hover:bg-gray-50"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-10 h-10"
          />
          Sign in with Google
        </button>

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
