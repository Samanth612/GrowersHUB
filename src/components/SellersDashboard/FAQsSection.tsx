import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import Icons from "../../Utilities/Icons";

interface MediaUploadProps {
  editing: any;
  setuploadButtonClicked: any;
  setFaqSection: any;
}

const FAQsSection: React.FC<MediaUploadProps> = ({
  editing,
  setuploadButtonClicked,
  setFaqSection,
}) => {
  const [faqQuestions, setFaqQuestions] = useState<
    { question: string; answer: string }[]
  >([{ question: "", answer: "" }]); // Start with one FAQ by default
  const [productDescription, setProductDescription] = useState<string>("");

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

  return (
    <div className="max-w-full min-h-[88vh] mx-auto bg-white">
      <div className="flex flex-wrap gap-3 items-center justify-between py-6 px-6 lg:px-12 border-b shadow-inner">
        <div className="flex flex-col gap-3 sm:hidden">
          <button className="flex items-center text-secondary gap-3">
            <ArrowLeft
              className="w-5 h-5 mr-1"
              onClick={() => {
                setFaqSection(false);
                setuploadButtonClicked(true);
              }}
            />
            <span className="font-semibold">{"ADD/View FAQS"}</span>
          </button>
        </div>
        <div className="hidden items-center gap-5 sm:flex">
          <button className="flex items-center text-secondary gap-3">
            <ArrowLeft
              className="w-5 h-5 mr-1"
              onClick={() => {
                setFaqSection(false);
                setuploadButtonClicked(true);
              }}
            />
            <span className="font-semibold text-xl">{"ADD/View FAQS"}</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col px-6 py-6 sm:px-12 xll:pl-12 xll:pr-0 gap-8">
        <div className="font-semibold text-xl">FAQs</div>
        {faqQuestions.map((faq, index) => (
          <div key={index} className="flex flex-col gap-4">
            <label className="flex w-1/2 justify-between text-sm text-teritary font-semibold mb-0">
              QUESTION {index + 1}
              {editing && (
                <div>
                  <button className="flex items-center gap-2">
                    <Icons variant="Delete" />
                    <span className=" text-red-500">Delete Listing</span>
                  </button>
                </div>
              )}
            </label>
            <div className="">
              <label className="block text-sm font-semibold mb-2">
                Question {index + 1}
              </label>
              <input
                type="text"
                placeholder="Type Your Question..."
                value={faq.question}
                onChange={(e) =>
                  handleFAQChange(index, "question", e.target.value)
                }
                className="w-1/2 border border-[#DBD8D8] rounded-lg p-3 focus:outline-green-500"
              />
            </div>
            <div className="">
              <label className="block text-sm font-semibold mb-2">Answer</label>
              <textarea
                id="product-description"
                placeholder="Type Your Solution..."
                className="w-1/2 border border-[#DBD8D8] rounded-lg p-3 resize-none focus:outline-green-500"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        ))}
        {/* Render the Add FAQ button only if there's at least one FAQ */}
        {faqQuestions.length > 0 && (
          <button
            type="button"
            onClick={addFAQ}
            className="text-primary self-start font-semibold"
          >
            + ADD MORE
          </button>
        )}
        <button
          className="px-6 py-3 w-40 bg-primary font-medium text-white rounded-lg  hover:bg-green-500"
          //   onClick={() => navigate(INBOX)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FAQsSection;
