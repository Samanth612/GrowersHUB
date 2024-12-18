import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import SG1 from "../../assets/SG1.jpg";
import PreviewCarousel from "./PreviewCarousel";
import { useNavigate } from "react-router-dom";
import { SUBSCRIPTIONS, YOURALBUM } from "../../Utilities/constantLinks";
import axios from "axios";
import { useSelector } from "react-redux";

interface UploadedFile {
  file: File;
  preview: string;
}

interface MediaUploadProps {
  setuploadButtonClicked: any;
  uploadButtonClicked?: any;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  setuploadButtonClicked,
  uploadButtonClicked,
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
  const userAlbum = useSelector((state: any) => state.userAlbum);
  const userData = useSelector((state: any) => state.userData.data);

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
      data.forEach((file) => form.append("files", file));

      const response = await axios.post(
        "http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/upload_files",
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
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const removeCategory = (_id: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c._id !== _id));
  };

  const removeExistingImage = (index: number) => {
    setExistingImageLinks((prev) => {
      const updatedLinks = [...prev];
      updatedLinks.splice(index, 1); // Remove the image link
      return updatedLinks;
    });
  };

  const handlePost = async (e: any) => {
    e.preventDefault();

    try {
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
      };

      const APIUrl =
        userAlbum && uploadButtonClicked
          ? `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/user/album/${userAlbum?._id}`
          : "http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/user/album/";

      const response = await axios.post(APIUrl, requestPayload, {
        headers: {
          Authorization: `Bearer ${userData?.access_token}`,
        },
      });

      if (response?.data?.status) {
        navigate(YOURALBUM);
      }
    } catch (error) {
      console.error("Error listing product:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/seller/products/categories`,
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
      }
    };

    fetchCategories();
  }, [userData, userAlbum]);

  return (
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
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center">
            <div className="w-60 h-2 bg-green-100 rounded">
              <div className="w-full bg-premiumgreen rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <span className="ml-2 text-[16px]">5 / 5 Free Albums left</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <span className="text-[16px]">Get Unlimited albums & more.</span>
            <a
              className="text-[16px] text-primary font-medium hover:text-green-500"
              onClick={() => navigate(SUBSCRIPTIONS)}
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-6 sm:pl-12 gap-8">
        {/* Left Section */}
        <form onSubmit={handlePost} className="w-full sm:w-[50%] py-6">
          <div className="mb-6 flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={SG1}
                alt={"Gardener"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex flex-col">
              <p className="text-xl font-medium">Eko Susiloanto</p>
              <p className="text-sm text-teritary">User</p>
            </div>
          </div>

          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-[#DBD8D8] rounded-lg p-8 mb-6 text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
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
            className="w-full border border-[#DBD8D8] rounded-lg p-3 mb-6"
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
                    <button onClick={() => removeCategory(category._id)}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}

                {/* Dropdown for adding categories */}
                {availableCategories.filter(
                  (category) =>
                    !selectedCategories.some((sel) => sel._id === category._id) // Match by `_id`
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
            type="submit"
            className="w-full sm:w-44 bg-primary text-white rounded-lg py-3 mb-14 font-medium hover:bg-green-500"
          >
            Post
          </button>
        </form>

        {/* Right Preview Section */}
        {uploadedFiles?.length > 0 && (
          <div className="w-80">
            <div className="border p-4">
              <h2 className="text-xl text-center font-semibold py-2">
                Preview
              </h2>
            </div>
            <div className="flex items-start justify-center border h-[90vh]">
              <PreviewCarousel uploadedFiles={uploadedFiles} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
