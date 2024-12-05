import React, { useState } from "react";
import Header from "../Header";
import Dashboard from "../Chat/Dashboard";
import CreateAlbum from "./CreateAlbum";
import MediaUpload from "./UploadSection";

const CreateAlbumLayout: React.FC = () => {
  const [uploadButtonClicked, setuploadButtonClicked] = useState(false);
  return (
    <div>
      <Header />
      <Dashboard>
        {uploadButtonClicked ? (
          <MediaUpload />
        ) : (
          <CreateAlbum setuploadButtonClicked={setuploadButtonClicked} />
        )}
      </Dashboard>
    </div>
  );
};

export default CreateAlbumLayout;
