// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Terms from "./Pages/Terms";
import {
  ABOUTUS,
  FORGOTPASSWORD,
  HOME,
  LOGIN,
  PRODUCTS,
  SIGNUP,
  TERMS,
} from "./Utilities/constantLinks";
import Aboutus from "./Pages/Aboutus";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserFlow from "./Pages/UserFlow";
import ForgotPassword from "./components/Login/ForgotPassword";
import UserLayout from "./Layouts/userLayout";
import ProtectedLayout from "./Layouts/protectedLayout";
import Products from "./components/Products/Products";
import ProductDetails from "./components/Products/ProductDetails";
import ViewSellersGarden from "./components/Products/ViewSellersGarden";
import DashboardLayout from "./Pages/Dashboard";

const App: React.FC = () => {
  return (
    <div className="font-jost">
      <BrowserRouter>
        <Routes>
          <Route element={<UserLayout />}>
            <Route
              path={LOGIN}
              element={
                <UserFlow>
                  <Login />
                </UserFlow>
              }
            />
            <Route
              path={SIGNUP}
              element={
                <UserFlow>
                  <Signup />
                </UserFlow>
              }
            />
            <Route
              path={FORGOTPASSWORD}
              element={
                <UserFlow>
                  <ForgotPassword />
                </UserFlow>
              }
            />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path={TERMS} element={<Terms />} />
            <Route path={ABOUTUS} element={<Aboutus />} />
            <Route path={PRODUCTS} element={<ViewSellersGarden />} />
          </Route>
          <Route path={HOME} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
