import React, { useState, DragEvent, ChangeEvent } from "react";
import { X } from "lucide-react";
import SG1 from "../../assets/SG1.jpg";
import PreviewCarousel from "./PreviewCarousel";

interface UploadedFile {
  file: File;
  preview: string;
}

const MediaUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [albumName, setAlbumName] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Plants",
    "Freshly sourced",
  ]);

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

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  return (
    <div className="max-w-full min-h-[88vh] mx-auto bg-white">
      <div className="flex flex-wrap gap-3 items-center justify-between py-3 px-12 border-b shadow-inner">
        <h1 className="text-xl font-semibold">Create Album</h1>
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
              href="#"
              className="text-[16px] text-primary font-medium hover:text-green-500"
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-6 sm:pl-12 gap-8">
        {/* Left Section */}
        <div className="w-full sm:w-[50%] py-6">
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
                className="text-green-600 hover:underline"
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

          {/* Post Button */}
          <button className="w-full sm:w-44 bg-primary text-white rounded-lg py-3 mb-14 font-medium hover:bg-green-500">
            Post
          </button>
        </div>

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
