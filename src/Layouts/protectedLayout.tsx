// src/components/UserLayout.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { LOGIN } from "../Utilities/constantLinks";

const ProtectedLayout: React.FC = () => {
  const AuthReducer = useSelector((state: any) => state.auth);

  if (!AuthReducer) {
    return <Navigate to={LOGIN} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
