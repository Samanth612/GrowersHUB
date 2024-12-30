import React, { useEffect, useState } from "react";
import Header from "../Header";
import CreateAlbum from "./CreateAlbum";
import MediaUpload from "./UploadSection";
import { useLocation } from "react-router-dom";
import { store } from "../../Store/store";
import Dashboard from "../../Pages/Dashboard";
import { useSelector } from "react-redux";

const CreateAlbumLayout: React.FC = () => {
  const [uploadButtonClicked, setuploadButtonClicked] = useState(false);
  const location = useLocation();
  const albumCount = useSelector((state: any) => state.AlbumCount);

  useEffect(() => {
    if (location?.state === "Edit") {
      setuploadButtonClicked(true);
    } else {
      store.dispatch({
        type: "removeAlbumData",
        payload: {
          data: null,
        },
      });
    }
  }, [location]);

  return (
    <div>
      <Header />
      <Dashboard>
        {uploadButtonClicked ? (
          <MediaUpload
            setuploadButtonClicked={setuploadButtonClicked}
            uploadButtonClicked={uploadButtonClicked}
            albumCount={albumCount}
          />
        ) : (
          <CreateAlbum
            setuploadButtonClicked={setuploadButtonClicked}
            albumCount={albumCount}
          />
        )}
      </Dashboard>
    </div>
  );
};

export default CreateAlbumLayout;
