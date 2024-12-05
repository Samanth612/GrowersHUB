import React, { useState } from "react";
import Header from "../Header";
import Dashboard from "../Chat/Dashboard";
import CreateAlbum from "../CreateAlbum/CreateAlbum";
import MediaUpload from "../CreateAlbum/UploadSection";

const YourAlbumLayout: React.FC = () => {
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

export default YourAlbumLayout;
