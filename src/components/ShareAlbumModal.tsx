import { X } from "lucide-react";
import React from "react";
import Icons from "../Utilities/Icons";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { CONFIG } from "../config";
import { useSelector } from "react-redux";

interface ModalProps {
  onClose: () => void;
  selectVideo?: any;
}

const ShareAlbumModal: React.FC<ModalProps> = ({ onClose, selectVideo }) => {
  const ShareId = useSelector((state: any) => state.ShareId.id);
  const ShareType = useSelector((state: any) => state.ShareId.type);
  const userData = useSelector((state: any) => state.userData.data);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-secondary bg-slate-200 rounded-full hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl text-secondary font-semibold mb-2">
          Share this Album
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          If you like this post, share it with your friends
        </p>

        <div className="flex justify-between">
          {/* Album Preview */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="w-48 h-60 rounded-lg border overflow-hidden border-gray-300">
              {selectVideo?.type === "video" ? (
                <video
                  className="w-full h-full object-cover"
                  src={selectVideo?.src || "https://via.placeholder.com/150"}
                  controls
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={selectVideo?.src || "https://via.placeholder.com/150"}
                />
              )}
            </div>
            <div className="-ml-8">
              <p className="text-lg font-semibold">
                {selectVideo?.title || "Crassula small leaf"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-center w-[64%]">
            {/* Social Media Buttons */}
            <div className="flex justify-around w-full items-center">
              <TwitterShareButton
                url={`${CONFIG?.API_ENDPOINT}/share/${ShareType}?id=${ShareId}`}
                className={""}
              >
                <button className="flex flex-col items-center text-gray-500 hover:text-gray-800">
                  <span> {`${CONFIG?.API_ENDPOINT}/share/${ShareType}?id=${ShareId}`}
                    <Icons variant="Twitter" />
                  </span>
                  <span className="text-sm mt-1">Twitter</span>
                </button>
              </TwitterShareButton>
              <FacebookShareButton
                url={`${CONFIG?.API_ENDPOINT}/share/${ShareType}?id=${ShareId}`}
                className={""}
              >
                <button className="flex flex-col items-center text-gray-500 hover:text-gray-800">
                  <span>
                    <Icons variant="FaceBook" />
                  </span>
                  <span className="text-sm mt-1">Facebook</span>
                </button>
              </FacebookShareButton>
              <WhatsappShareButton
                url={`${CONFIG?.API_ENDPOINT}/share/${ShareType}?id=${ShareId}`}
                className={""}
              >
                <button className="flex flex-col items-center text-gray-500 hover:text-gray-800">
                  <span>
                    <Icons variant="Whatsapp" />
                  </span>
                  <span className="text-sm mt-1">Whatsapp</span>
                </button>
              </WhatsappShareButton>
              <EmailShareButton
                url={`${CONFIG?.API_ENDPOINT}/share/${ShareType}?id=${ShareId}`}
              >
                <button className="flex flex-col items-center text-gray-500 hover:text-gray-800">
                  <span>
                    <Icons variant="Instagram" />
                  </span>
                  <span className="text-sm mt-1">Email</span>
                </button>
              </EmailShareButton>
            </div>

            {/* Share Link */}
            <div className="relative w-full">
              <input
                type="text"
                readOnly
                placeholder={
                  ShareType === "album"
                    ? `${CONFIG?.API_ENDPOINT?.replace(
                        "-api",
                        ""
                      )}/share/album?id=${userData?._id}`
                    : `${CONFIG?.API_ENDPOINT?.replace(
                        "-api",
                        ""
                      )}/product?id=${ShareId}`
                }
                className="w-full p-4 pr-7 border-2 rounded-lg placeholder:text-teritary focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 py-1"
                onClick={() => {
                  if (ShareType === "album") {
                    navigator.clipboard.writeText(
                      `${CONFIG?.API_ENDPOINT?.replace(
                        "-api",
                        ""
                      )}/share/album?id=${userData?._id}`
                    );
                  } else {
                    navigator.clipboard.writeText(
                      `${CONFIG?.API_ENDPOINT?.replace(
                        "-api",
                        ""
                      )}/product?id=${ShareId}`
                    );
                  }
                }}
              >
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 6H3.5C2.67275 6 2 6.67275 2 7.5V15C2 15.8273 2.67275 16.5 3.5 16.5H11C11.8273 16.5 12.5 15.8273 12.5 15V7.5C12.5 6.67275 11.8273 6 11 6Z"
                    fill="black"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M15.5 1.5H8C7.60218 1.5 7.22064 1.65804 6.93934 1.93934C6.65804 2.22064 6.5 2.60218 6.5 3V4.5H12.5C12.8978 4.5 13.2794 4.65804 13.5607 4.93934C13.842 5.22064 14 5.60218 14 6V12H15.5C15.8978 12 16.2794 11.842 16.5607 11.5607C16.842 11.2794 17 10.8978 17 10.5V3C17 2.60218 16.842 2.22064 16.5607 1.93934C16.2794 1.65804 15.8978 1.5 15.5 1.5Z"
                    fill="black"
                    fill-opacity="0.5"
                  />
                </svg>
              </button>
            </div>

            {/* Share Button */}
            <button className="w-full px-6 py-3 font-medium border rounded-lg bg-primary hover:bg-green-500 text-white text-lg">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareAlbumModal;
