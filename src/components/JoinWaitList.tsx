import React, { useState } from "react";
import emailjs from "emailjs-com";

interface ModalProps {
  onClose: () => void;
}

const JoinWaitList: React.FC<ModalProps> = ({ onClose }) => {
  const [errors, setErrors] = useState({
    user_name: "",
    user_email: "",
    user_zip: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("user_name") as string;
    const email = formData.get("user_email") as string;
    const address = formData.get("user_address") as string;
    const zip = formData.get("user_zip") as string;

    // Validate fields
    const newErrors: typeof errors = {
      user_name: name ? "" : "Please enter your full name.",
      user_email: email ? "" : "Please enter your email.",
      user_zip:
        zip && /^\d{5}$/.test(zip)
          ? ""
          : "Please enter a valid 5-digit zip code.",
    };

    setErrors(newErrors);

    // Check if any errors exist
    if (Object.values(newErrors).some((error) => error)) return;

    //Email to user
    emailjs
      .send(
        "service_2oza6g8",
        "template_9bxza26",
        {
          email: email,
          user_name: name,
        },
        "0VK2Ixd8CfInEDnaP"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Sucessfully Enrolled!");
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Failed to Enroll");
        }
      );

    //Email to admin
    emailjs
      .send(
        "service_2oza6g8",
        "template_ywcnrdj",
        {
          user_name: name,
          signup_date: new Date().toISOString(),
          user_email: email,
          user_address: address,
          user_zip: zip,
          email: "growershubtech@gmail.com",
        },
        "0VK2Ixd8CfInEDnaP"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.error("FAILED...", error);
        }
      );
    onClose();
  };

  return (
    <div>
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-secondary mb-6">
          Join the Waitlist
          <br />
          <span className="text-tertiary text-base font-light mt-4 line-clamp-2">
            Join Growers Hub and become part of a community that values nature,
            sustainability, and connection.
          </span>
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-secondary">
              Name
            </label>
            <input
              type="text"
              name="user_name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.user_name && (
              <p className="text-xs text-red-500">{errors.user_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              placeholder="Enter registered email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.user_email && (
              <p className="text-xs text-red-500">{errors.user_email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary">
              Address
            </label>
            <input
              type="text"
              name="user_address"
              placeholder="Enter your Address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.user_email && (
              <p className="text-xs text-red-500">{errors.user_email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary">
              Your Zip code
            </label>
            <input
              type="text"
              name="user_zip"
              placeholder="Enter 5-digit zip code"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.user_zip && (
              <p className="text-xs text-red-500">{errors.user_zip}</p>
            )}
            <p className="text-xs text-gray-500">
              This would help us find nearby services
            </p>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-green-500 font-semibold"
          >
            Join the Waitlist
          </button>

          <button
            type="submit"
            onClick={() => onClose()}
            className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-green-500 font-semibold"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinWaitList;
