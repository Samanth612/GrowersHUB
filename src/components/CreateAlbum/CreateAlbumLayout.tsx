import React, { useEffect, useState } from "react";
import Header from "../Header";
import Dashboard from "../Chat/Dashboard";
import CreateAlbum from "./CreateAlbum";
import MediaUpload from "./UploadSection";
import { useLocation } from "react-router-dom";
import { store } from "../../../Store/store";

const CreateAlbumLayout: React.FC = () => {
  const [uploadButtonClicked, setuploadButtonClicked] = useState(false);
  const location = useLocation();

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
          />
        ) : (
          <CreateAlbum setuploadButtonClicked={setuploadButtonClicked} />
        )}
      </Dashboard>
    </div>
  );
};

export default CreateAlbumLayout;
