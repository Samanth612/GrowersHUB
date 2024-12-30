import React from "react";
import Header from "../Header";
import Profile from "./Profile";
import Dashboard from "../../Pages/Dashboard";

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
