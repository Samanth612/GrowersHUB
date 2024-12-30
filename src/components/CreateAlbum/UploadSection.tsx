import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import SG1 from "../../assets/SG1.jpg";
import PreviewCarousel from "./PreviewCarousel";
import { useNavigate } from "react-router-dom";
import { SUBSCRIPTIONS, YOURALBUM } from "../../Utilities/constantLinks";
import axios from "axios";
import { useSelector } from "react-redux";
import { CONFIG } from "../../config";
import SellersModal from "../SellersModal";
import { store } from "../../Store/store";
import toast from "react-hot-toast";

interface UploadedFile {
  file: File;
  preview: string;
}

interface MediaUploadProps {
  setuploadButtonClicked: any;
  uploadButtonClicked?: any;
  albumCount: any;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  setuploadButtonClicked,
  uploadButtonClicked,
  albumCount,
}) => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [albumName, setAlbumName] = useState<string>("");
  const [existingImageLinks, setExistingImageLinks] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);
  const [availableCategories, setAvailableCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);
  const [initialImages, setInitialImages] = useState<{
    imageFiles: File[];
    existingImageLinks: string[];
  }>({
    imageFiles: [],
    existingImageLinks: [],
  });
  const [loading, setLoading] = useState(false);
  const [IsopenModal, setIsOpenModal] = useState(false);
  const userAlbum = useSelector((state: any) => state.userAlbum);
  const userData = useSelector((state: any) => state.userData.data);

  const imagesUpdated =
    JSON.stringify(initialImages.imageFiles) !== JSON.stringify(imageFiles) ||
    JSON.stringify(initialImages.existingImageLinks) !==
      JSON.stringify(existingImageLinks);

  const addCategory = (category: { _id: string; categoryName: string }) => {
    if (!selectedCategories.find((c) => c._id === category._id)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newFiles = Array.from(files);

    setImageFiles((prev) => [...prev, ...newFiles]);

    const filePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedFiles((prev) => [...prev, ...filePreviews]);
  };

  const makeAxiosRequest = async (data: File[]) => {
    try {
      const form = new FormData();
      data.forEach((file) => {
        form.append("files", file);
      });

      form.append("type", "Album");

      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/upload_files`,
        form,
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      console.error(
        "Error uploading files:",
        (error as any).response || (error as any).message
      );
      throw error; // Rethrow the error for handling in the calling function
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview); // Clean up memory
      newFiles.splice(index, 1);
      return newFiles;
    });
    setImageFiles((prev) => {
      const newImageFiles = [...prev];
      newImageFiles.splice(index, 1); // Ensure corresponding `imageFiles` updates
      return newImageFiles;
    });
  };

  const removeCategory = (_id: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c._id !== _id));
  };

  const removeExistingImage = (index: number) => {
    setExistingImageLinks((prev) => {
      const updatedLinks = [...prev];
      updatedLinks.splice(index, 1);
      return updatedLinks;
    });
  };

  const handlePost = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation checks
      if (selectedCategories.length === 0) {
        toast.error("Please select at least one category.");
        setLoading(false);
        return;
      }

      if (!imageFiles?.length && existingImageLinks.length === 0) {
        toast.error("Please upload at least one image.");
        setLoading(false);
        return;
      }

      let finalImageLinks = [...existingImageLinks];

      if (imageFiles?.length > 0) {
        try {
          const uploadedFileUrls: any = await makeAxiosRequest(imageFiles);
          const newImageLinks = Array.isArray(uploadedFileUrls.assets)
            ? uploadedFileUrls.assets.map((imgLink: any) => imgLink.link)
            : [];

          finalImageLinks = [...existingImageLinks, ...newImageLinks];
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      }

      const requestPayload = {
        name: albumName,
        categories: selectedCategories.map((category) => category._id),
        images: finalImageLinks,
        ...(userAlbum &&
          uploadButtonClicked && { imagesUpdated: imagesUpdated }),
      };

      const APIUrl =
        userAlbum && uploadButtonClicked
          ? `${CONFIG?.API_ENDPOINT}/user/album/${userAlbum?._id}`
          : `${CONFIG?.API_ENDPOINT}/user/album/`;

      const response = await axios.post(APIUrl, requestPayload, {
        headers: {
          Authorization: `Bearer ${userData?.access_token}`,
        },
      });

      if (response?.data?.status && !userAlbum) {
        store.dispatch({
          type: "albumCount",
          payload: {
            data: albumCount + 1,
          },
        });
        scrollTo(0, 0);
        navigate(YOURALBUM);
      } else {
        scrollTo(0, 0);
        navigate(YOURALBUM);
      }
    } catch (error) {
      toast.error((error as any)?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (userAlbum) {
      setInitialImages({
        imageFiles: [], // Initially no new files
        existingImageLinks: userAlbum.images || [],
      });
    }
  }, [userAlbum]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${CONFIG?.API_ENDPOINT}/seller/products/categories`,
          {
            headers: {
              Authorization: `Bearer ${userData?.access_token}`,
              "Cache-Control": "no-cache",
            },
          }
        );

        const allCategories = Array.isArray(response.data.data)
          ? response.data.data.map((cat: any) => ({
              _id: cat._id,
              categoryName: cat.categoryName,
            }))
          : [];

        if (userAlbum) {
          const selectedCategories = userAlbum.categories.map(
            (category: any) => ({
              _id: category._id,
              categoryName: category.categoryName,
            })
          );

          // Set product details
          setAlbumName(userAlbum.name);
          setSelectedCategories(selectedCategories);
          setExistingImageLinks(userAlbum.images || []);

          // Filter and combine categories
          const remainingCategories = allCategories.filter(
            (cat: any) =>
              !selectedCategories.some((sel: any) => sel._id === cat._id)
          );
          setAvailableCategories([
            ...selectedCategories,
            ...remainingCategories,
          ]);
        } else {
          // If not editing, set all categories
          setAvailableCategories(allCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);

        // Fallback categories
        setAvailableCategories([
          { _id: "1", categoryName: "Technology" },
          { _id: "2", categoryName: "Health" },
          { _id: "3", categoryName: "Finance" },
          { _id: "4", categoryName: "Education" },
          { _id: "5", categoryName: "Travel" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [userData, userAlbum]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePost}>
      <div className="max-w-full min-h-[88vh] mx-auto bg-white">
        <div className="flex flex-wrap gap-3 items-center justify-between py-3 px-6 lg:px-12 border-b shadow-inner">
          <div className="flex flex-col gap-3 sm:hidden">
            <button
              className="flex items-center text-secondary gap-3 xll:hidden"
              onClick={() => setuploadButtonClicked(false)}
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span className="font-semibold">Back</span>
            </button>
            <h1 className="text-xl font-semibold">Create Album</h1>
          </div>
          <div className="hidden items-center gap-5 sm:flex">
            <button
              className="flex items-center text-secondary gap-3 xll:hidden"
              onClick={() => setuploadButtonClicked(false)}
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span className="font-semibold">Back</span>
            </button>
            <h1 className="text-xl font-semibold">Create Album</h1>
          </div>
          {userData && !userData?.isSeller && (
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center">
                <div className="w-60 h-2 bg-green-100 rounded">
                  <div className="w-full bg-premiumgreen rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{
                        width: `${Math.min((albumCount / 5) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="ml-2 text-[16px]">
                  {albumCount} / 5 Free Albums left
                </span>
              </div>
              <div className="flex items-center gap-1 font-semibold">
                <span className="text-[16px]">
                  Get Unlimited albums & more.
                </span>
                <a
                  className="text-[16px] text-primary font-medium hover:text-green-500"
                  onClick={() => {
                    scrollTo(0, 0);
                    navigate(SUBSCRIPTIONS);
                  }}
                >
                  Subscribe
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between px-6 sm:pl-12 gap-8">
          {/* Left Section */}
          <div className="w-full sm:w-[50%] py-6">
            <div className="mb-6 flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={userData?.image || SG1}
                  alt={"Gardener"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex flex-col">
                <p className="text-xl font-medium">
                  {userAlbum?.userDetails[0]?.name ||
                    userData?.name ||
                    "Eko Susiloanto"}
                </p>
                <p className="text-sm text-teritary">
                  {userData?.isSeller ? "Seller" : "User"}
                </p>
              </div>
            </div>

            {/* Upload Area */}
            <div
              className="border-2 border-dashed border-[#DBD8D8] rounded-lg p-8 mb-6 text-center"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="mb-4">
                <div
                  className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2 cursor-pointer"
                  onClick={() => document.getElementById("fileInput")?.click()}
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
                  onClick={() => document.getElementById("fileInput")?.click()}
                  className="text-green-600"
                >
                  Click here
                </button>
                <span className="ml-1">to upload or drop media here</span>
                <input
                  id="fileInput"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>
            </div>

            <div className="flex gap-4 mb-6 overflow-x-auto">
              {/* Render existing images */}
              {existingImageLinks.map((link, index) => (
                <div key={index} className="relative">
                  <img
                    src={link}
                    alt={`Existing ${index + 1}`}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeExistingImage(index)}
                    type="button"
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Render newly uploaded files */}
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={file.preview}
                    alt={`Upload ${index + 1}`}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    type="button"
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Album Name Input */}
            <input
              type="text"
              placeholder="Type Album name.."
              className="w-full border border-[#DBD8D8] focus:outline-green-500 rounded-lg p-3 mb-6"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />

            {/* Categories */}
            <div className="mb-6">
              <label className="block text-[16px] font-semibold mb-2">
                Category
              </label>
              <div className="border border-[#DBD8D8] rounded-lg p-3 w-full">
                <div className="flex flex-wrap gap-2">
                  {/* Display selected categories */}
                  {selectedCategories.map((category, index) => (
                    <span
                      key={category._id} // Correct `key` attribute
                      className="bg-green-50 text-secondary px-3 py-1 rounded-[4px] flex items-center gap-2"
                    >
                      {category.categoryName}
                      <button
                        onClick={() => removeCategory(category._id)}
                        type="button"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}

                  {/* Dropdown for adding categories */}
                  {availableCategories.filter(
                    (category) =>
                      !selectedCategories.some(
                        (sel) => sel._id === category._id
                      ) // Match by `_id`
                  ).length > 0 && (
                    <select
                      className="border-none outline-none bg-transparent px-3 py-1"
                      value="" // Reset value after selection
                      onChange={(e) => {
                        const selected = availableCategories.find(
                          (cat) => cat._id === e.target.value
                        );
                        if (selected) {
                          addCategory(selected); // Add selected category
                        }
                      }}
                    >
                      <option value="">Add category</option>
                      {availableCategories
                        .filter(
                          (category) =>
                            !selectedCategories.some(
                              (sel) => sel._id === category._id
                            ) // Match by `_id`
                        )
                        .map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.categoryName}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* Post Button */}
            <button
              type={`${userAlbum && uploadButtonClicked ? "button" : "submit"}`}
              className="w-full sm:w-44 bg-primary text-white rounded-lg py-3 mb-14 font-medium hover:bg-green-500"
              disabled={loading}
              onClick={() => {
                if (!albumName.trim()) {
                  toast.error("Please enter an album name.");
                  return;
                }

                if (selectedCategories.length === 0) {
                  toast.error("Please select at least one category.");
                  return;
                }

                if (
                  imageFiles.length === 0 &&
                  existingImageLinks.length === 0
                ) {
                  toast.error("Please upload at least one image.");
                  return;
                }

                if (userAlbum && uploadButtonClicked) {
                  setIsOpenModal(true);
                }
              }}
            >
              Post
            </button>
          </div>

          {/* Right Preview Section */}
          {uploadedFiles.length > 0 || existingImageLinks.length > 0 ? (
            <div className="w-80">
              <div className="border p-4">
                <h2 className="text-xl text-center font-semibold py-2">
                  Preview
                </h2>
              </div>
              <div className="flex items-start justify-center border h-[90vh]">
                <PreviewCarousel
                  uploadedFiles={[
                    ...existingImageLinks.map((link) => ({ preview: link })),
                    ...uploadedFiles,
                  ]}
                  userName={
                    userAlbum?.userDetails[0]?.name ||
                    userData?.name ||
                    "Eko Susiloanto"
                  }
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {IsopenModal && (
        <SellersModal
          onClose={onClose}
          handlePost={handlePost}
          title={"Are you sure you want to update changes"}
          button={"Update"}
        />
      )}
    </form>
  );
};

export default MediaUpload;
