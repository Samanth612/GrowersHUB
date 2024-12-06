// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Terms from "./Pages/Terms";
import {
  ABOUTUS,
  COMMUNITY,
  CREATEALBUM,
  FORGOTPASSWORD,
  HELP,
  HOME,
  INBOX,
  LOGIN,
  PRIVACYPOLICY,
  PRODUCT,
  PRODUCTS,
  SIGNUP,
  SUBSCRIPTIONS,
  VIEWSELLERSGARDEN,
  YOURALBUM,
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
import CreateAlbumLayout from "./components/CreateAlbum/CreateAlbumLayout";
import YourAlbumLayout from "./components/YourAlbum/YourAlbumLayout";
import SubscriptionsLayout from "./components/Subscriptions/SubscriptionsLayout";
import CommunityLayout from "./components/Community/Community";
import PrivacyPolicy from "./components/PrivacyPolicy";

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
            <Route path={PRODUCTS} element={<Products />} />
            <Route path={PRODUCT} element={<ProductDetails />} />
            <Route path={VIEWSELLERSGARDEN} element={<ViewSellersGarden />} />
            <Route path={INBOX} element={<DashboardLayout />} />
            <Route path={CREATEALBUM} element={<CreateAlbumLayout />} />
            <Route path={YOURALBUM} element={<YourAlbumLayout />} />
            <Route path={SUBSCRIPTIONS} element={<SubscriptionsLayout />} />
          </Route>
          <Route path={HOME} element={<Home />} />
          <Route path={COMMUNITY} element={<CommunityLayout />} />
          <Route path={PRIVACYPOLICY} element={<PrivacyPolicy />} />
          <Route path={HELP} element={<Terms />} />
          <Route path={ABOUTUS} element={<Aboutus />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
