import React from "react";
import Header from "../Header";
import Subscriptions from "./Subscriptions";
import Dashboard from "../../Pages/Dashboard";

const SubscriptionsLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Dashboard>
        <Subscriptions />
      </Dashboard>
    </div>
  );
};

export default SubscriptionsLayout;
