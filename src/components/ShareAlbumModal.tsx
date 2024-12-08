import React from "react";

interface ModalProps {
  onClose: () => void;
}

const ShareAlbumModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Close"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-2">Share this Album</h2>
        <p className="text-sm text-gray-500 mb-4">
          If you like this post, share it with your friends
        </p>

        {/* Album Preview */}
        <div className="flex items-center mb-4">
          <div className="w-24 h-24 rounded overflow-hidden border border-gray-300">
            <video
              className="w-full h-full object-cover"
              src="https://via.placeholder.com/150"
              controls
            />
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold">Crassula small leaf</p>
          </div>
        </div>

        {/* Social Media Buttons */}
        <div className="flex justify-around items-center mb-4">
          <button className="flex flex-col items-center text-gray-500 hover:text-gray-800">
            <span>🐦</span>
            <span className="text-xs mt-1">Twitter</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-gray-800">
            <span>📘</span>
            <span className="text-xs mt-1">Facebook</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-gray-800">
            <span>📱</span>
            <span className="text-xs mt-1">Whatsapp</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-gray-800">
            <span>📸</span>
            <span className="text-xs mt-1">Instagram</span>
          </button>
        </div>

        {/* Share Link */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            readOnly
            value="https://t.me/album122/525/526"
            className="flex-1 border border-gray-300 rounded-l-md px-2 py-1 text-sm text-gray-600"
          />
          <button
            className="bg-gray-100 text-gray-500 px-2 py-1 rounded-r-md hover:bg-gray-200"
            onClick={() =>
              navigator.clipboard.writeText("https://t.me/album122/525/526")
            }
          >
            📋
          </button>
        </div>

        {/* Share Button */}
        <div className="flex justify-center">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareAlbumModal;
