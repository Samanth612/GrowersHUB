import React, { useState } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import LoginSuccessComponent from "../Login/LoginSuccess";
import axios from "axios";
import { CONFIG } from "../../config";
import toast from "react-hot-toast";

interface ModalProps {
  onClose: () => void;
  productId: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const ChatFAQs: React.FC<ModalProps> = ({ onClose, productId }) => {
  const [faq, setFaq] = useState<FAQ>({ question: "", answer: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: any) => state.userData.data);

  const handleFAQChange = (field: keyof FAQ, value: string) => {
    setFaq({ ...faq, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!faq.question.trim()) {
      newErrors.question = "Question is required.";
    }
    if (!faq.answer.trim()) {
      newErrors.answer = "Answer is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) return;

    try {
      const payload = {
        question: faq.question,
        answer: faq.answer,
      };

      const response = await axios.post(
        `${CONFIG?.API_ENDPOINT}/seller/products/add-faq/${productId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
          },
        }
      );
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        setSuccess(true);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      onClose();
      setFaq({ question: "", answer: "" });
    }, 3000);
  };

  return (
    <div>
      {success ? (
        <LoginSuccessComponent
          type={"FAQ"}
          title={"FAQ Submitted Successfully"}
        />
      ) : (
        <div className="relative bg-white w-full p-8 rounded-lg shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 text-secondary bg-slate-200 rounded-full hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-bold text-secondary mb-2 md:mb-6">
            FAQ
          </h2>
          <form className="space-y-1 w-96 md:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Question
              </label>
              <input
                type="text"
                placeholder="Type Your Question..."
                value={faq.question}
                onChange={(e) => handleFAQChange("question", e.target.value)}
                className={`w-full border rounded-lg p-3 focus:outline-green-500 ${
                  errors.question ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.question && (
                <p className="text-red-500 text-sm mt-1">{errors.question}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Answer</label>
              <textarea
                placeholder="Type Your Solution..."
                value={faq.answer}
                onChange={(e) => handleFAQChange("answer", e.target.value)}
                className={`w-full border rounded-lg p-3 resize-none focus:outline-green-500 ${
                  errors.answer ? "border-red-500" : "border-gray-300"
                }`}
                rows={6}
              />
              {errors.answer && (
                <p className="text-red-500 text-sm mt-1">{errors.answer}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-green-500 font-semibold"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatFAQs;
