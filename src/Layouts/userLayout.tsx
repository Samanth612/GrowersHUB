// src/components/UserLayout.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { HOME } from "../Utilities/constantLinks";

const UserLayout: React.FC = () => {
  const AuthReducer = useSelector((Data: any) => Data.auth);

  return <>{!AuthReducer ? <Outlet /> : <Navigate to={HOME} />}</>;
};

export default UserLayout;
