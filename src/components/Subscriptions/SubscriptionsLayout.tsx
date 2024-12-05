import React from "react";
import Header from "../Header";
import Dashboard from "../Chat/Dashboard";
import Subscriptions from "./Subscriptions";

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
