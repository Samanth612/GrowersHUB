import React, { useState } from "react";

interface FAQ {
  _id?: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  FAQSData?: FAQ[]; // Optional array of FAQs
  isLoading?: boolean; // Optional loading state
}

const FAQSection: React.FC<FAQSectionProps> = ({
  FAQSData = [],
  isLoading = false,
}) => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs =
    FAQSData.length > 0
      ? FAQSData
      : [
          {
            question: "How do weather conditions affect plant growth?",
            answer:
              "Plants are sensitive to temperature extremes, frost, drought, and excessive rainfall. Extreme weather can stunt growth or damage plants. It's essential to know the temperature tolerance of your plants and protect them when needed. For example, using frost covers or bringing potted plants indoors during cold spells can prevent damage. In drought conditions, make sure to water plants deeply and regularly to support their growth.",
          },
          {
            question: "Can I grow plants indoors successfully?",
            answer:
              "Yes, with the right light, water, and care, indoor plants can thrive.",
          },
          {
            question: "What are the signs of a healthy plant?",
            answer:
              "Healthy plants typically have vibrant green leaves, strong stems, and no signs of pests or diseases.",
          },
          {
            question: "How can I improve the soil quality in my garden?",
            answer:
              "You can improve soil quality by adding organic matter like compost, using mulch, and testing the soil for proper nutrients.",
          },
        ];

  return (
    <div className="bg-white px-6 py-12 lg:px-12">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left Section: Introduction */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl tabmd:text-5xl font-semibold leading-normal text-secondary mb-8">
            FAQs
          </h2>
          <p className="mb-6 text-teritary w-[65%]">
            Find answers to common queries about plant care, growing conditions,
            plant produce, and more.
          </p>
          <div className="font-medium text-[16px] text-secondary mb-4">
            Got more questions?
          </div>
          <button className="bg-primary text-[16px] rounded-lg px-12 py-2 text-white hover:bg-green-500">
            Ask a Question
          </button>
        </div>

        {/* Right Section: FAQ List */}
        <div className="md:col-span-2 w-full md:w-1/2">
          {isLoading ? (
            <div className="text-secondary">Loading FAQs...</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="py-4">
                  <div
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3 className="text-lg font-semibold text-secondary">
                      {faq.question}
                    </h3>
                    <span className="text-secondary">
                      {openQuestion === index ? "−" : "+"}
                    </span>
                  </div>
                  {openQuestion === index && (
                    <p className="mt-2 text-teritary">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
