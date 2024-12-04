import React from "react";
import Header from "../components/Header";
import Dashboard from "../components/Chat/Dashboard";

const DashboardLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Dashboard />
      {/* <Chat /> */}
    </div>
  );
};

export default DashboardLayout;
