import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Icons from "../Utilities/Icons";
import axios from "axios";
import { CONFIG } from "../config";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoginSuccessComponent from "./Login/LoginSuccess";

interface ModalProps {
  onClose: () => void;
}

const JoinWaitList: React.FC<ModalProps> = ({ onClose }) => {
  const [profileImage, setProfileImage] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [zipCode, setZipCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 10000 * 1024) {
        setProfileImage(file);
        setErrors((prev) => ({ ...prev, profileImage: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Please upload an image less than 100KB",
        }));
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setUploadedFile(file);
      } else {
        setErrors((prev) => ({
          ...prev,
          uploadedFiles: "Please upload a valid image file",
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!profileImage) {
      newErrors.profileImage = "Profile image is required";
    }

    if (!zipCode) {
      newErrors.zipCode = "Zip code is required";
    } else if (!/^\d{5}$/.test(zipCode)) {
      newErrors.zipCode = "Zip code must be a 5-digit number";
    }

    if (!address) {
      newErrors.address = "Address is required";
    }

    if (!uploadedFile) {
      newErrors.uploadedFiles = "Please upload a verification document (image)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const makeAxiosRequest = async (data: File[]) => {
    try {
      const form = new FormData();
      data.forEach((file) => {
        form.append("files", file);
      });

      form.append("type", "Proof");

      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/upload_files`,
        form,
        {
          headers: {
            Authorization: `Bearer ${userData?.data?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error uploading files:",
        (error as any).response || (error as any).message
      );
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const coordinatesResponse = await axios.get(
        `${CONFIG?.API_ENDPOINT}/auth/coordinates`,
        {
          params: {
            address: address,
          },
        }
      );

      const latitude = coordinatesResponse?.data?.data?.location?.lat;
      const longitude = coordinatesResponse?.data?.data?.location?.lng;

      if (!latitude || !longitude) {
        throw new Error("Failed to fetch valid coordinates");
      }

      let profileImageLink = profileImage;
      let uploadedFileLink = uploadedFile;

      if (typeof profileImage !== "string") {
        const uploadedFilesData = await makeAxiosRequest([profileImage]);
        profileImageLink = uploadedFilesData?.assets[0]?.link;
      }

      if (typeof uploadedFile !== "string") {
        const uploadedFilesData = await makeAxiosRequest([uploadedFile]);
        uploadedFileLink = uploadedFilesData?.assets[0]?.link;
      }

      const payload = {
        image: profileImageLink,
        zipcode: zipCode,
        location: {
          address: address,
          latitude: latitude || "80",
          longitude: longitude || "80",
        },
        proof: [uploadedFileLink],
      };

      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/user/request-seller`,
        payload,
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
            image: payload?.image,
            zipcode: payload?.zipcode,
            address: payload?.location.address,
          },
        };

        dispatch({
          type: "userData",
          payload: {
            data: updatedUserData,
          },
        });
        toast.success("Your request to become a seller has been submitted");
        setSuccess(true);
        onClose();
      } else {
        throw new Error("Failed to submit request. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      console.error("Error submitting seller request:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setFormLoading(true);
      try {
        const response = await axios.get(
          `${CONFIG?.API_ENDPOINT}/user/get-waitlist`,
          {
            headers: {
              Authorization: `Bearer ${userData?.data?.access_token}`,
              "Cache-Control": "no-cache",
            },
          }
        );

        const { image, zipcode, location, proof } = response?.data?.data[0];
        setProfileImage(image || "");
        setZipCode(zipcode || "");
        setAddress(location?.address || "");
        setUploadedFile(proof[0] || "");
      } catch (error) {
        console.log(error);
      } finally {
        setFormLoading(false);
      }
    };

    fetchDetails();
  }, [userData]);

  return (
    <div className="scale-90">
      {success ? (
        <LoginSuccessComponent
          type={"requestSeller"}
          title={"Request Sent Successfully"}
        />
      ) : (
        <div>
          <div className="relative bg-white w-full max-w-xl p-8 rounded-lg shadow-lg">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 text-secondary bg-slate-200 rounded-full hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-3xl font-bold text-secondary mb-2 md:mb-6">
              Join the Waitlist
            </h2>
            {formLoading ? (
              <div className="flex items-center justify-center w-[320px] h-96">
                <div className="loader"></div>
              </div>
            ) : (
              <form className="space-y-1 md:space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-wrap items-center gap-6">
                  {profileImage ? (
                    <img
                      src={
                        typeof profileImage === "string"
                          ? profileImage
                          : URL.createObjectURL(profileImage)
                      }
                      alt="Selected Profile"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full">
                      <Icons variant="AlbumProfile" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="italic text-[14px] text-teritary">
                      Please upload profile image, size less than 100KB
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleProfileImageChange}
                        className="hidden"
                        id="profile-upload"
                      />
                      <label
                        htmlFor="profile-upload"
                        className="px-6 py-2 border border-secondary font-semibold rounded-md cursor-pointer"
                      >
                        Choose File
                      </label>
                      <span className="text-secondary font-semibold w-28 truncate">
                        {profileImage !== "" && profileImage
                          ? profileImage.name
                          : "No File Chosen"}
                      </span>
                    </div>
                    {errors.profileImage && (
                      <p className="text-red-500 text-sm">
                        {errors.profileImage}
                      </p>
                    )}
                  </div>
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-[14px] mb-2 font-medium text-secondary">
                    Your Zip code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    maxLength={5}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter Zip code"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">{errors.zipCode}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-[14px] mb-2 font-medium text-secondary">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House no./Street name/Building"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>

                <label className="block text-[14px] mb-2 font-medium text-secondary">
                  Upload your Driver’s License/Passport for verification
                </label>
                <div
                  className="border-2 border-dashed border-[#DBD8D8] rounded-lg p-8 mb-6 text-center"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="mb-4">
                    <div
                      className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2 cursor-pointer"
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
                    >
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
                      className="text-green-600"
                    >
                      Click here
                    </button>
                    <span className="ml-1">to upload or drop media here</span>
                    <input
                      id="fileInput"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                  </div>
                  {uploadedFile && (
                    <div className="flex justify-center mt-4">
                      <img
                        src={
                          typeof uploadedFile === "string"
                            ? uploadedFile
                            : URL.createObjectURL(uploadedFile)
                        }
                        alt="Uploaded file"
                        className="w-32 h-16 object-cover rounded-md"
                      />
                    </div>
                  )}
                  {errors.uploadedFiles && (
                    <p className="text-red-500 text-sm">
                      {errors.uploadedFiles}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-green-500 font-semibold"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Join the Waitlist"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinWaitList;
