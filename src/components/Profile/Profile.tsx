import { Pencil } from "lucide-react";
import React, { useState, useRef } from "react";
import SG1 from "../../assets/SG1.jpg";

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "Alexa Rawles",
    email: "alexarawles@gmail.com",
    zipCode: "",
    address: "",
    profileImage: SG1,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prevState) => ({
        ...prevState,
        profileImage: imageUrl,
      }));
    }
  };

  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    const words = name.split(" ").filter(Boolean);
    return words.map((word) => word[0].toUpperCase()).join("");
  };

  return (
    <div className="max-w-full mx-auto bg-white">
      <div className="flex items-center justify-between py-6 px-6 lg:px-12 border-b shadow-inner">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Update Profile</h1>
        </div>
      </div>
      <div className="max-w-md mx-6 lg:mx-20 py-16">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex items-center gap-4">
            <div className="relative">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">
                  {getInitials(formData.name)}
                </div>
              )}
              <div
                onClick={handlePencilClick}
                className="absolute -right-1 -bottom-1 bg-white rounded-full p-1 border cursor-pointer"
              >
                <Pencil className="w-4 h-4 text-primary" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                {formData.name || "Anonymous User"}
              </h2>
              <p className="text-gray-500">{formData.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-2">
                Edit Zip code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-green-500"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Edit Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-green-500 text-white py-4 rounded-lg text-lg font-semibold"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
