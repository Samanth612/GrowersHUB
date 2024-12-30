import { ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
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
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const SellersProductData = useSelector(
    (state: any) => state.SellersProductData
  );

  // Accessing FAQs data from redux store
  const faqsData = useSelector((state: any) => state.faqs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (faqsData && faqsData.length > 0) {
      setFaqQuestions(faqsData);
    } else {
      setFaqQuestions([{ question: "", answer: "" }]);
    }
  }, [faqsData]);

  const addFAQ = () => {
    const lastFAQ = faqQuestions[faqQuestions.length - 1];
    if (!lastFAQ.question.trim() || !lastFAQ.answer.trim()) {
      toast.error("Please complete the current FAQ before adding a new one.");
      return;
    }
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

  const handleDeleteFAQ = (index: number) => {
    const updatedFaqs = faqQuestions.filter((_, i) => i !== index);
    setFaqQuestions(updatedFaqs);

    dispatch({
      type: "faqsData",
      payload: {
        data: updatedFaqs,
      },
    });
  };

  const handleSave = () => {
    const isValid = faqQuestions.every(
      (faq) => faq.question.trim() !== "" && faq.answer.trim() !== ""
    );

    if (!isValid) {
      setErrorMessage("Please provide at least one FAQ.");
      return;
    }

    setErrorMessage("");

    const updatedFaqsData = faqQuestions.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }));

    if (editing) {
      dispatch({
        type: "sellersProductData",
        payload: {
          data: { ...SellersProductData, FAQ: updatedFaqsData },
        },
      });
    } else {
      dispatch({
        type: "faqsData",
        payload: {
          data: updatedFaqsData,
        },
      });
    }

    setFaqSection(false);
    setuploadButtonClicked(true);
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
              {faqsData.length > 0 && (
                <div>
                  <button
                    className="flex items-center gap-2"
                    onClick={() => handleDeleteFAQ(index)}
                  >
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
                value={faq.answer}
                onChange={(e) =>
                  handleFAQChange(index, "answer", e.target.value)
                }
                rows={4}
              />
            </div>
          </div>
        ))}
        {faqQuestions.length > 0 && (
          <button
            type="button"
            onClick={addFAQ}
            disabled={!faqQuestions[faqQuestions.length - 1]?.question.trim()}
            className={`text-primary self-start font-semibold ${
              !faqQuestions[faqQuestions.length - 1]?.question.trim()
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            + ADD MORE
          </button>
        )}
        {errorMessage && (
          <div className="text-red-500 text-sm font-medium">{errorMessage}</div>
        )}
        <button
          className="px-6 py-3 w-40 bg-primary font-medium text-white rounded-lg  hover:bg-green-500"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FAQsSection;
