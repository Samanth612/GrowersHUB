import { Pencil } from "lucide-react";
import React, { useState, useRef } from "react";
import SG1 from "../../assets/SG1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { CONFIG } from "../../config";
import axios from "axios";
import Modal from "../Modal";
import LoginSuccessComponent from "../Login/LoginSuccess";
import toast from "react-hot-toast";

const Profile: React.FC = () => {
  const userData = useSelector((state: any) => state.userData);
  const [formData, setFormData] = useState({
    name: userData?.data?.name || "Alexa Rawles",
    email: userData?.data?.email || "alexarawles@gmail.com",
    zipCode: userData?.data?.zipcode || "",
    address: userData?.data?.address || "",
    profileImage: userData?.data?.image || SG1,
  });
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const makeAxiosRequest = (data: any) => {
    let form = new FormData();
    for (let i = 0; i < data?.length; i++) {
      form.append(`files`, data[i]);
    }

    form.append("type", "Profile");

    return axios.post(`${CONFIG?.API_ENDPOINT}/upload_files`, form, {
      headers: {
        Authorization: `Bearer ${userData?.data?.access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files;
      try {
        const response = await makeAxiosRequest(file);

        const uploadedImageUrl = response.data?.assets[0]?.link;
        setFormData((prevState) => ({
          ...prevState,
          profileImage: uploadedImageUrl,
        }));
      } catch (error) {
        console.error("File upload failed:", error);
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData?.zipCode === "" && formData?.address === "") {
      toast.error("Please enter both zipcode and address");
      return;
    }

    if (formData?.zipCode === "") {
      toast.error("Please enter the zipcode");
      return;
    }

    if (formData?.address === "") {
      toast.error("Please enter the address");
      return;
    }

    const form = {
      image: formData?.profileImage,
      zipcode: formData?.zipCode,
      location: {
        address: formData.address,
        latitude: "80",
        longitude: "80",
      },
    };

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
        throw new Error("Failed to fetch valid coordinates");
      }

      form.location.latitude = latitude;
      form.location.longitude = longitude;

      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/user/update-profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${userData?.data?.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.status) {
        const updatedUserData = {
          ...userData,
          data: {
            ...userData.data,
            image: formData?.profileImage,
            zipcode: formData?.zipCode,
            address: formData.address,
          },
        };

        dispatch({
          type: "userData",
          payload: {
            data: updatedUserData,
          },
        });
        setSuccess(true);
      }
    } catch (error) {
      toast.error(
        (error as any).response?.data?.message || "An error occurred"
      );
    }

    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    const words = name.split(" ").filter(Boolean);
    return words.map((word) => word[0].toUpperCase()).join("");
  };

  return (
    <>
      {success ? (
        <Modal
          children={
            <LoginSuccessComponent
              type={"ProfileUpdate"}
              title={"Changes Updated Successfully"}
            />
          }
          onClose={() => setSuccess(false)}
        />
      ) : (
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
                    accept=".jpg, .jpeg, .png"
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
                    maxLength={5}
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
      )}
    </>
  );
};

export default Profile;
