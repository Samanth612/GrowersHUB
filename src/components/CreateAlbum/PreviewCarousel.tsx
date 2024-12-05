import React, { useEffect, useState } from "react";
import JP1 from "../../assets/JP1.jpg";
import SG1 from "../../assets/SG1.jpg";

interface PreviewCarouselProps {
  uploadedFiles: any;
}

const PreviewCarousel: React.FC<PreviewCarouselProps> = ({ uploadedFiles }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false); // Track manual interactions
  const totalSlides = uploadedFiles.length;

  // Navigate to the next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Reset timer on manual interaction
  const handleControlClick = (newIndex: number) => {
    setActiveIndex(newIndex);
    setIsManualChange(true); // Mark as manual change
  };

  const removeFileExtension = (fileName: string) => {
    return fileName?.substring(0, fileName.lastIndexOf(".")) || fileName;
  };

  useEffect(() => {
    if (isManualChange) {
      const timeoutId = setTimeout(() => setIsManualChange(false), 5000);
      return () => clearTimeout(timeoutId);
    }

    const intervalId = setInterval(nextSlide, 5000); // Auto-scroll interval
    return () => clearInterval(intervalId);
  }, [isManualChange, totalSlides]);

  return (
    <div className="relative w-full max-w-72 px-8 mt-4 overflow-hidden">
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
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden">
          {/* Slides */}
          <div
            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {uploadedFiles.map((product: any, index: any) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={product?.preview}
                  alt={index}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3">
            {uploadedFiles.map((_: any, index: any) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  activeIndex === index ? "bg-white" : "bg-white/50"
                } `}
                onClick={() => handleControlClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 text-center text-lg font-medium text-secondary">
          {removeFileExtension(uploadedFiles[activeIndex]?.file?.name)}
        </div>
      </div>
    </div>
  );
};

export default PreviewCarousel;
