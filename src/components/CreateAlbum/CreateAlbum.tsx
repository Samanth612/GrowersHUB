import React from "react";
import Icons from "../../Utilities/Icons";
import { useLocation } from "react-router-dom";

interface CreateAlbumProps {
  setuploadButtonClicked: any;
}

const CreateAlbum: React.FC<CreateAlbumProps> = ({
  setuploadButtonClicked,
}) => {
  const location = useLocation();
  const routeName = location?.pathname;
  const albumName = routeName?.includes("youralbum")
    ? "Your"
    : routeName?.includes("createalbum") && "Create";

  return (
    <div className="max-w-full mx-auto bg-white">
      <div className="flex flex-wrap gap-3 items-center justify-between py-3 px-12 border-b shadow-inner">
        <h1 className="text-xl font-semibold">{albumName} Album</h1>
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
            <span className="ml-2 text-[16px]">5 / 5 Free Albums left</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <span className="text-[16px]">Get Unlimited albums & more.</span>
            <a
              href="#"
              className="text-[16px] text-primary font-medium hover:text-green-500"
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-20">
        <div>
          <Icons variant="Album" />
        </div>
        <h1 className="text-xl font-bold text-black mb-1">
          Congrats! You can now upload &{" "}
        </h1>
        <p className="text-xl font-bold text-black mb-4">
          share up to <span className="font-bold">5 Albums for FREE</span>.
        </p>
        <p className="text-[16px] text-secondary mb-6">
          Upload or Drag and drop your media here
        </p>
        <div className="flex space-x-4">
          <button className="px-6 py-3 w-40 font-medium text-secondary border-2 border-secondary rounded-lg hover:bg-gray-50">
            Upgrade
          </button>
          <button
            className="px-6 py-3 w-40 bg-primary font-medium text-white rounded-lg  hover:bg-green-500"
            onClick={() => setuploadButtonClicked(true)}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAlbum;
