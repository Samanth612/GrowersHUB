import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import CP1 from "../assets/CP1.jpg";
import CP2 from "../assets/CP2.jpg";
import CP3 from "../assets/CP3.jpg";
import SG1 from "../assets/SG1.jpg";

interface Gardener {
  id: number;
  title: string;
  description: string;
  image: string;
  profileImage: string;
  name: string;
  badge: string;
}

const gardeners: Gardener[] = [
  {
    id: 1,
    title: "Indoor-Outdoor Green Retreat",
    description: "Create a green sanctuary at home, indoors or out...",
    image: CP1,
    profileImage: SG1,
    name: "Eko Susiloanto",
    badge: "Super Grower",
  },
  {
    id: 2,
    title: "Your Indoor-Outdoor Garden Oasis",
    description: "Design a cozy garden retreat, inside and out...",
    image: CP2,
    profileImage: SG1,
    name: "Eko Susiloanto",
    badge: "Super Grower",
  },
  {
    id: 3,
    title: "Garden Spaces",
    description: "Bring your garden dreams to life, indoors and outdoors...",
    image: CP3,
    profileImage: SG1,
    name: "Eko Susiloanto",
    badge: "Newbie",
  },
  {
    id: 4,
    title: "Home Garden Haven",
    description: "Craft a serene garden escape, indoors or outdoors...",
    image: CP3,
    profileImage: SG1,
    name: "Eko Susiloanto",
    badge: "Newbie",
  },
  {
    id: 5,
    title: "Your Perfect Home Garden",
    description: "Your ideal garden retreat, wherever you are...",
    image: CP3,
    profileImage: SG1,
    name: "Eko Susiloanto",
    badge: "Newbie",
  },
];

const GardenersShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    // Function to update slidesPerView based on window size
    const updateSlidesPerView = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1); // Mobile size (1 item per view)
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setSlidesPerView(2); // Tablet size (2 items per view)
      } else {
        setSlidesPerView(3); // Desktop size (3 items per view)
      }
    };

    // Call on initial load
    updateSlidesPerView();

    // Add event listener for resizing the window
    window.addEventListener("resize", updateSlidesPerView);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  // Calculate the max slides available for each screen size
  const maxSlides = gardeners.length - slidesPerView;

  // Handle next slide
  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides)); // Ensure it doesn't go beyond max slides
  };

  // Handle previous slide
  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0)); // Ensure it doesn't go below 0
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) handleNext();
    if (touchStart - touchEnd < -50) handlePrev();
  };

  return (
    <div className="max-w-full mx-6 md:mx-12 py-12">
      {/* Header Section */}
      <div className="mb-12 space-y-6">
        <div className="text-primary font-medium text-xl mb-2">Community</div>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Meet Our Gardeners
        </h1>
        <p className="text-teritary text-lg md:text-2xl w-full lg:w-[54%]">
          Behind every garden is a story. Here at Growers Hub, we celebrate our
          community and share their journeys. Meet our gardeners, hear their
          stories, and see how they've transformed simple spaces into thriving
          gardens.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-10 mb-6">
        <button
          className={`p-4 rounded-full ${
            currentSlide === 0
              ? "bg-teritary text-white cursor-not-allowed"
              : "bg-primary hover:bg-primary text-white"
          }`}
          onClick={handlePrev}
          disabled={currentSlide === 0}
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>
        <button
          className={`p-4 rounded-full ${
            currentSlide === maxSlides
              ? "bg-teritary text-white cursor-not-allowed"
              : "bg-primary hover:bg-primary text-white"
          }`}
          onClick={handleNext}
          disabled={currentSlide === maxSlides}
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Cards Grid with Sliding Animation */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            // Adjust the transform for proper slide movement based on screen size
            transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {gardeners.map((gardener) => (
            <div
              key={gardener.id}
              className="flex-shrink-0 w-full bg-white rounded-lg overflow-hidden shadow-lg"
              style={{ width: `calc(100% / ${slidesPerView})` }} // Ensure each card takes the correct width
            >
              <div className="relative h-64">
                <img
                  src={gardener.image}
                  alt={gardener.title}
                  className="w-full h-full object-cover border rounded-3xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{gardener.title}</h3>
                <p className="text-teritary mb-6">{gardener.description}</p>

                {/* Profile Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={gardener.profileImage}
                        alt={gardener.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {gardener.badge === "Super Grower" && (
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4 text-green-700">✓</div>
                            <span className="text-green-700 text-sm">
                              Super Grower
                            </span>
                          </div>
                        )}
                        {gardener.badge === "Newbie" && (
                          <span className="text-gray-600 text-sm">Newbie</span>
                        )}
                      </div>
                      <div className="font-medium">{gardener.name}</div>
                    </div>
                  </div>
                  <button className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-700">
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots indicator for mobile */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {Array.from({ length: maxSlides + 1 }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GardenersShowcase;
