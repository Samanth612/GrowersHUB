import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password: string;
  confirmPassword: string;
}

const PasswordResetForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle password reset logic here
      console.log("Password reset submitted:", formData);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Reset Password</h1>
      <form onSubmit={handleSubmit}>
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
              errors.confirmPassword ? "border-red-500" : "border-teritary"
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-500 transition-colors"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
