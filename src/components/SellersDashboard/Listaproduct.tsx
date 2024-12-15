import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";
import { ArrowLeft, Check, Minus, Plus, X } from "lucide-react";
import SG1 from "../../assets/SG1.jpg";
import Icons from "../../Utilities/Icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "../../../Store/store";

interface UploadedFile {
  file: File;
  preview: string;
}

interface MediaUploadProps {
  setuploadButtonClicked: any;
  editing: any;
  setFaqSection: any;
}

const ListProduct: React.FC<MediaUploadProps> = ({
  setuploadButtonClicked,
  editing,
  setFaqSection,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [existingImageLinks, setExistingImageLinks] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<any[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [unitsForSale, setUnitsForSale] = useState<number>(5);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [selectedCategories, setSelectedCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);
  const [availableCategories, setAvailableCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);
  const [isChecked, setIsChecked] = useState(false);
  const title = editing ? "Edit Listing" : "List a Product";
  const userData = useSelector((state: any) => state.userData.data);
  const faqsData = useSelector((state: any) => state.faqs);
  const SellersProductData = useSelector(
    (state: any) => state.SellersProductData
  );

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

  const handleFileInput = (e: any) => {
    const files: any = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newFiles = Array.from(files);

    // Update the imageFiles state with the array of files
    setImageFiles((prev) => [...prev, ...newFiles]);

    const filePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedFiles((prev) => [...prev, ...filePreviews]);
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

  const handleDelete = async (productId: string) => {
    try {
      const response = await axios.post(
        `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/seller/products/delete/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      if (response.data.status) {
        console.log("Product deleted successfully:", response.data.data);
        setuploadButtonClicked(false);
        setFaqSection(false);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const increment = () => {
    setUnitsForSale((prev) => prev + 1);
  };

  const decrement = () => {
    setUnitsForSale((prev) => Math.max(0, prev - 1));
  };

  const handleInputChange = (e: any) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setUnitsForSale(value);
    }
  };

  const makeAxiosRequest = (data: any) => {
    let form = new FormData();
    for (let i = 0; i < data?.length; i++) {
      form.append(`files`, data[i]);
    }

    return axios.post(
      "http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/upload_files",
      form,
      {
        headers: {
          Authorization: `Bearer ${userData?.access_token}`,
          "Content-Type": "multipart/form-data", // Ensure multipart headers
        },
      }
    );
  };

  const handlePost = async (e: any) => {
    e.preventDefault();

    try {
      let finalImageLinks = [...existingImageLinks];

      if (imageFiles?.length > 0) {
        try {
          const uploadedFileUrls: any = await makeAxiosRequest(imageFiles);
          const newImageLinks = Array.isArray(uploadedFileUrls.data.assets)
            ? uploadedFileUrls.data.assets.map((imgLink: any) => imgLink.link)
            : [];
          finalImageLinks = [...existingImageLinks, ...newImageLinks];
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      }

      const requestPayload = {
        name: productName,
        description: productDescription,
        categories: selectedCategories.map((category) => category._id),
        unitSale: unitsForSale,
        price: pricePerUnit,
        images: finalImageLinks,
        uploadAsAlbum: isChecked,
        faqs: faqsData || [],
      };

      const response = await axios.post(
        "http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/seller/products/",
        requestPayload,
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
          },
        }
      );

      if (response.data.status) {
        setuploadButtonClicked(false);
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

        if (editing && SellersProductData) {
          const selectedCategories = SellersProductData.categories.map(
            (category: any) => ({
              _id: category._id,
              categoryName: category.categoryName,
            })
          );

          // Set product details
          setProductName(SellersProductData.name);
          setProductDescription(SellersProductData.description);
          setPricePerUnit(SellersProductData.price);
          setUnitsForSale(SellersProductData.unitSale);
          setSelectedCategories(selectedCategories);
          setExistingImageLinks(SellersProductData.images || []);

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
  }, [userData, editing, SellersProductData]);

  return (
    <div className="max-w-full min-h-[88vh] mx-auto bg-white">
      <div className="flex flex-wrap gap-3 items-center justify-between py-6 px-6 lg:px-12 border-b shadow-inner">
        <div className="flex flex-col gap-3 sm:hidden">
          <button className="flex items-center text-secondary gap-3">
            <ArrowLeft
              className="w-5 h-5 mr-1"
              onClick={() => setuploadButtonClicked(false)}
            />
            <span className="font-semibold">{title}</span>
          </button>
        </div>
        <div className="hidden items-center gap-5 sm:flex">
          <button
            className="flex items-center text-secondary gap-3"
            onClick={() => setuploadButtonClicked(false)}
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="font-semibold text-xl">{title}</span>
          </button>
        </div>
        {editing && SellersProductData && (
          <div>
            <button
              className="flex items-center gap-2"
              onClick={() => handleDelete(SellersProductData?._id)}
            >
              <Icons variant="Delete" />
              <span className=" text-red-500">Delete Listing</span>
            </button>
          </div>
        )}
      </div>
      <form
        onSubmit={handlePost}
        className="flex justify-between px-6 sm:px-12 xll:pl-12 xll:pr-0 gap-8"
      >
        {/* Left Section */}
        <div className="w-full xll:w-[50%] py-6">
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
                onClick={() => document.getElementById("fileInput")?.click()}
                className="text-green-600"
                type="button"
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

          {/* Uploaded Files Preview */}
          <div className="flex gap-4 mb-6 overflow-x-auto">
            {/* Existing Images */}
            {existingImageLinks.map((link, index) => (
              <div key={`existing-${index}`} className="relative">
                <img
                  src={link}
                  alt={`Existing Image ${index + 1}`}
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

            {/* New Uploaded Files */}
            {uploadedFiles.map((file, index) => (
              <div key={`uploaded-${index}`} className="relative">
                <img
                  src={file.preview}
                  alt={`Uploaded ${index + 1}`}
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

          <div className="mb-6 text-xl font-semibold">Product Details</div>

          {/* Product Name */}
          <div className="mb-6">
            <label
              htmlFor="product-name"
              className="block font-semibold text-sm text-secondary mb-2"
            >
              Product Name
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="Type Product Name"
              className="w-full border border-[#DBD8D8] rounded-lg p-3 focus:outline-green-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* Product Description */}
          <div className="mb-6">
            <label
              htmlFor="product-description"
              className="block font-semibold text-sm text-secondary mb-2"
            >
              Product Description
            </label>
            <textarea
              id="product-description"
              placeholder="Type Album name.."
              className="w-full border border-[#DBD8D8] rounded-lg p-3 resize-none focus:outline-green-500"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Product Category
            </label>
            <div className="mb-3">
              <div className="border border-[#DBD8D8] rounded-lg p-3 w-full">
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <span
                      key={category._id}
                      className="bg-green-50 text-secondary px-3 py-1 rounded-[4px] flex items-center gap-2"
                    >
                      {category.categoryName}
                      <button onClick={() => removeCategory(category._id)}>
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                  {availableCategories.filter(
                    (category) =>
                      !selectedCategories.find((c) => c._id === category._id)
                  ).length > 0 && (
                    <select
                      className="border-none outline-none bg-transparent px-3 py-1"
                      value=""
                      onChange={(e) => {
                        const selected = availableCategories.find(
                          (cat) => cat._id === e.target.value
                        );
                        if (selected) {
                          addCategory(selected);
                        }
                      }}
                    >
                      <option value="">Add category</option>
                      {availableCategories
                        .filter(
                          (category) =>
                            !selectedCategories.find(
                              (c) => c._id === category._id
                            )
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
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Units for Sale */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Units for Sale
              </label>
              <div className="flex items-center">
                <button
                  onClick={decrement}
                  className="border border-[#DBD8D8] border-r-0 rounded-l-lg px-3 py-4"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={unitsForSale}
                  onChange={handleInputChange}
                  className="w-24 border-y border-[#DBD8D8] p-3 text-center focus:outline-none"
                />
                <button
                  onClick={increment}
                  className="border border-[#DBD8D8] border-l-0 rounded-r-lg px-3 py-4"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price per Unit */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Price per Unit (in $)
              </label>
              <div className="relative w-full">
                <div className="absolute w-14 border border-r-0 border-[#DBD8D8] inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-premiumgray rounded-tl-lg rounded-bl-lg text-secondary">
                  &nbsp;&nbsp;$
                </div>
                <input
                  type="number"
                  placeholder="Price in $"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(Number(e.target.value))}
                  className="w-48 border border-[#DBD8D8] rounded-lg py-3 pl-16 placeholder:text-teritary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-xl font-semibold">FAQs</div>

            <button
              type="button"
              onClick={() => {
                setFaqSection(true);
                store.dispatch({
                  type: "faqsData",
                  payload: {
                    data: editing ? SellersProductData?.FAQ : [],
                  },
                });
              }}
              className="text-primary font-bold"
            >
              + ADD/View FAQs
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setIsChecked(!isChecked)}
              className={`w-5 h-5 flex items-center justify-center rounded ${
                isChecked ? "bg-green-600" : "border-2 border-gray-300"
              }`}
              aria-checked={isChecked}
              role="checkbox"
            >
              {isChecked && <Check className="text-white" size={16} />}
            </button>
            <label className="text-lg font-semibold text-gray-700">
              Also Upload it as an album
            </label>
          </div>

          {/* Post Button */}
          <button
            type="submit"
            className="w-full sm:w-44 bg-primary text-white rounded-lg py-3 mb-14 font-semibold hover:bg-green-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListProduct;
