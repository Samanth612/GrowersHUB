import React from "react";
import Header from "../Header";
import Dashboard from "../Chat/Dashboard";
import Profile from "./Profile";

const ProfileLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Dashboard>
        <Profile />
      </Dashboard>
    </div>
  );
};

export default ProfileLayout;
