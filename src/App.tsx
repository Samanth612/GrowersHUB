// src/App.tsx
import React, { useEffect } from "react";
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
  LISTINGPRODUCT,
  LOGIN,
  PRIVACYPOLICY,
  PRODUCT,
  PRODUCTS,
  PROFILE,
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
import CreateAlbumLayout from "./components/CreateAlbum/CreateAlbumLayout";
import YourAlbumLayout from "./components/YourAlbum/YourAlbumLayout";
import SubscriptionsLayout from "./components/Subscriptions/SubscriptionsLayout";
import CommunityLayout from "./components/Community/Community";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SellersDashboardLayout from "./components/SellersDashboard/SellersDashboardLayout";
import ProfileLayout from "./components/Profile/ProfileLayout";
import { useSelector } from "react-redux";
import DashboardLayout from "./components/Chat/Dashboard";
import { CONFIG } from "./config";
import { store } from "./Store/store";
import NoPage from "./components/NoPage";

const App: React.FC = () => {
  const userData = useSelector((state: any) => state.userData.data);

  const Getnotifications = () => {
    const socket = new WebSocket(
      `${CONFIG?.WEBSOCKET}?Auth_Token=${userData?.access_token}`
    );

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          action: "JOIN_NOTIFICATION",
        })
      );
    };

    socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      console.log(data, "Data");
      if (data?.type === "NEW_NOTIFICATION") {
        store.dispatch({
          type: "LatestNotificationData",
          payload: {
            data: data?.data?.notifcation,
          },
        });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed.");
    };
  };

  useEffect(() => {
    Getnotifications();
  }, [userData]);

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
            <Route path={PROFILE} element={<ProfileLayout />} />
            <Route path={INBOX} element={<DashboardLayout />} />
            <Route path={CREATEALBUM} element={<CreateAlbumLayout />} />
            <Route path={YOURALBUM} element={<YourAlbumLayout />} />
            <Route path={SUBSCRIPTIONS} element={<SubscriptionsLayout />} />
            {userData?.isSeller && (
              <Route
                path={LISTINGPRODUCT}
                element={<SellersDashboardLayout />}
              />
            )}
          </Route>
          <Route path={HOME} element={<Home />} />
          <Route path={PRODUCTS} element={<Products />} />
          <Route path={COMMUNITY} element={<CommunityLayout />} />
          <Route path={PRODUCT} element={<ProductDetails />} />
          <Route path={VIEWSELLERSGARDEN} element={<ViewSellersGarden />} />
          <Route path={PRIVACYPOLICY} element={<PrivacyPolicy />} />
          <Route path={HELP} element={<Terms />} />
          <Route path={ABOUTUS} element={<Aboutus />} />
          <Route
            path="*"
            element={
              <div className="h-screen">
                <NoPage
                  variant="NotFoundPrimary"
                  header="No page Found"
                  subtext="The page you are looking for is not found"
                />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
