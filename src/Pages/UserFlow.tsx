import React, { Children, useState } from "react";
import UserLoginSignup from "../components/UserLoginSignup";
import Header from "../components/Header";

interface UserFlowProps {
  children: React.ReactNode;
}

const UserFlow: React.FC<UserFlowProps> = ({ children }) => {
  return (
    <Header>
      <div className="flex items-center justify-between max-w-full mx-6 md:mx-20 px-4 py-12 min-h-screen">
        <div className="flex flex-col justify-center max-w-[28%] mx-36 w-full">
          {children}
        </div>
        <UserLoginSignup />
      </div>
    </Header>
  );
};

export default UserFlow;
