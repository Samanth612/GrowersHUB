import React, { useState, DragEvent, ChangeEvent } from "react";
import { ArrowLeft, Check, Minus, Plus, X } from "lucide-react";
import SG1 from "../../assets/SG1.jpg";
import { useNavigate } from "react-router-dom";
import PreviewCarousel from "../CreateAlbum/PreviewCarousel";

interface UploadedFile {
  file: File;
  preview: string;
}

interface MediaUploadProps {
  setuploadButtonClicked: any;
}

const ListProduct: React.FC<MediaUploadProps> = ({
  setuploadButtonClicked,
}) => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [unitsForSale, setUnitsForSale] = useState<number>(5);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [productLocation, setProductLocation] = useState<string>("");
  const [faqQuestions, setFaqQuestions] = useState<
    { question: string; answer: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Plants",
    "Freshly sourced",
  ]);
  const [isChecked, setIsChecked] = useState(false);

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
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const addFAQ = () => {
    setFaqQuestions([...faqQuestions, { question: "", answer: "" }]);
  };

  const handleFAQChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const newFaqs = [...faqQuestions];
    newFaqs[index][field] = value;
    setFaqQuestions(newFaqs);
  };

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
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

  return (
    <div className="max-w-full min-h-[88vh] mx-auto bg-white">
      <div className="flex flex-wrap gap-3 items-center justify-between py-6 px-6 lg:px-12 border-b shadow-inner">
        <div className="flex flex-col gap-3 sm:hidden">
          <button className="flex items-center text-secondary gap-3">
            <ArrowLeft
              className="w-5 h-5 mr-1"
              onClick={() => setuploadButtonClicked(false)}
            />
            <span className="font-semibold">List a Product</span>
          </button>
        </div>
        <div className="hidden items-center gap-5 sm:flex">
          <button
            className="flex items-center text-secondary gap-3"
            onClick={() => setuploadButtonClicked(false)}
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="font-semibold text-xl">List a Product</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between px-6 sm:px-12 xll:pl-12 xll:pr-0 gap-8">
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
              className="w-full border border-[#DBD8D8] rounded-lg p-3"
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
            <input
              id="product-description"
              type="text"
              placeholder="Type Album name.."
              className="w-full border border-[#DBD8D8] rounded-lg p-3"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Product Category
            </label>
            <div className="border border-[#DBD8D8] rounded-lg p-3">
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedCategories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-green-50 text-secondary px-3 py-1 rounded-[4px] flex items-center gap-2"
                  >
                    {category}
                    <button onClick={() => removeCategory(category)}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
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
                  className="w-48 border border-[#DBD8D8] rounded-lg py-3 pl-16 placeholder:text-teritary"
                />
              </div>
            </div>

            {/* Product Location */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Change product location
              </label>
              <input
                type="text"
                placeholder="Enter 5 digit zip code"
                value={productLocation}
                onChange={(e) => setProductLocation(e.target.value)}
                className="w-full border border-[#DBD8D8] rounded-lg p-3"
              />
            </div>
          </div>

          <div className="mb-6 text-xl font-semibold">FAQs</div>

          {/* FAQs */}
          <div className="mb-6">
            {faqQuestions.map((faq, index) => (
              <div key={index} className="flex flex-col gap-4 mb-4">
                <label className="block text-sm text-teritary font-semibold mb-0">
                  QUESTION {index + 1}
                </label>
                <div className="">
                  <label className="block text-sm font-semibold mb-2">
                    Question {index + 1}
                  </label>
                  <input
                    type="text"
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) =>
                      handleFAQChange(index, "question", e.target.value)
                    }
                    className="w-1/2 border border-[#DBD8D8] rounded-lg p-3"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">
                    Answer
                  </label>
                  <input
                    type="text"
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) =>
                      handleFAQChange(index, "answer", e.target.value)
                    }
                    className="w-1/2 border border-[#DBD8D8] rounded-lg p-3"
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addFAQ} className="text-primary">
              + Add FAQ
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
          <button className="w-full sm:w-44 bg-primary text-white rounded-lg py-3 mb-14 font-semibold hover:bg-green-500">
            Save
          </button>
        </div>

        {/* Right Preview Section */}
        {/* {uploadedFiles?.length > 0 && (
          <div className="w-80">
            <div className="border border-t-0 p-4">
              <h2 className="text-xl text-center font-semibold py-2">
                Preview
              </h2>
            </div>
            <div className="flex items-start justify-center border h-full">
              <PreviewCarousel uploadedFiles={uploadedFiles} />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ListProduct;
