import React from "react";

interface ModalProps {
  onClose: () => void;
  title: string;
  button: string;
  handleDelete?: () => void;
  handlePost?: any;
}

const SellersModal: React.FC<ModalProps> = ({
  onClose,
  title,
  button,
  handleDelete,
  handlePost,
}) => {
  const handleAction = (e: any) => {
    if (button === "Delete" && handleDelete) {
      handleDelete();
    } else if (handlePost) {
      handlePost(e);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-2 text-gray-500 text-2xl"
        >
          &times;
        </button>
        <p className="text-lg font-semibold mb-4">{title}</p>
        <div className="flex justify-around mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 font-medium text-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleAction}
            className="px-6 py-2 font-medium border border-secondary rounded-md text-secondary"
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellersModal;
