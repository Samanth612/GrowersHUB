import React, { useState } from "react";
import Header from "../Header";
import Dashboard from "../Chat/Dashboard";
import CreateAlbum from "../CreateAlbum/CreateAlbum";
import YourAlbum from "./YourAlbum";

const YourAlbumLayout: React.FC = () => {
  const [uploadButtonClicked, setuploadButtonClicked] = useState(false);
  return (
    <div>
      <Header />
      <Dashboard>
        {uploadButtonClicked ? (
          <YourAlbum />
        ) : (
          <CreateAlbum setuploadButtonClicked={setuploadButtonClicked} />
        )}
      </Dashboard>
    </div>
  );
};

export default YourAlbumLayout;
