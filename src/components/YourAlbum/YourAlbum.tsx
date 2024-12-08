import React, { useState } from "react";
import PlantGrid from "./PlantGrid";
import { ArrowLeft } from "lucide-react";
import Icons from "../../Utilities/Icons";
import SplitGrid from "./SplitGrid";
import { useNavigate } from "react-router-dom";
import { SUBSCRIPTIONS } from "../../Utilities/constantLinks";
import Modal from "../Modal";
import JoinWaitList from "../JoinWaitList";
import ShareAlbumModal from "../ShareAlbumModal";

interface YourAlbumProps {
  setuploadButtonClicked: any;
}

const YourAlbum: React.FC<YourAlbumProps> = ({ setuploadButtonClicked }) => {
  const navigate = useNavigate();
  const [splitCards, setSplitCards] = useState(false);
  const [cardName, setCardName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="max-w-full min-h-[88vh] mx-auto bg-white">
        {splitCards ? (
          <>
            <div className="flex flex-wrap gap-3 items-center justify-between py-[17.20px] px-6 sm:px-12 border-b shadow-inner">
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center text-secondary"
                  onClick={() => setSplitCards(false)}
                >
                  <ArrowLeft className="w-5 h-5 mr-1" />
                </button>
                <h1 className="text-xl font-semibold">
                  {`${cardName || "Crassula small leaf plant"}`}
                </h1>
              </div>
              <div className="flex items-center gap-12">
                <button>
                  <Icons variant="Delete" />
                </button>
                <button>
                  <Icons variant="Edit" />
                </button>
                <button
                  className="px-6 py-2 font-semibold border border-secondary rounded-lg bg-white text-secondary text-lg"
                  onClick={openModal}
                >
                  Share Album
                </button>
              </div>
            </div>
            <SplitGrid />
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-3 items-center justify-between py-3 px-6 lg:px-12 border-b shadow-inner">
              <div className="flex flex-col gap-3 sm:hidden">
                <button
                  className="flex items-center text-secondary gap-3 xll:hidden"
                  onClick={() => setuploadButtonClicked(false)}
                >
                  <ArrowLeft className="w-5 h-5 mr-1" />
                  <span className="font-semibold">Back</span>
                </button>
                <div className="flex gap-3">
                  <h1 className="text-xl font-semibold">Your Album</h1>
                  <span className="bg-gray-100 px-2 py-1 font-semibold rounded-full text-sm">
                    3
                  </span>
                </div>
              </div>
              <div className="hidden items-center gap-5 sm:flex">
                <button
                  className="flex items-center text-secondary gap-3 xll:hidden"
                  onClick={() => setuploadButtonClicked(false)}
                >
                  <ArrowLeft className="w-5 h-5 mr-1" />
                  <span className="font-semibold">Back</span>
                </button>
                <h1 className="text-xl font-semibold">Your Album</h1>
                <span className="bg-gray-100 px-2 py-1 font-semibold rounded-full text-sm">
                  3
                </span>
              </div>
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
                  <span className="ml-2 text-[16px]">
                    5 / 5 Free Albums left
                  </span>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <span className="text-[16px]">
                    Get Unlimited albums & more.
                  </span>
                  <a
                    className="text-[16px] text-primary font-medium hover:text-green-500"
                    onClick={() => navigate(SUBSCRIPTIONS)}
                  >
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
            <PlantGrid
              setSplitCards={setSplitCards}
              setCardName={setCardName}
            />
          </>
        )}
      </div>
      {isModalOpen && (
        <Modal children={<ShareAlbumModal onClose={closeModal} />} />
      )}
    </>
  );
};

export default YourAlbum;
