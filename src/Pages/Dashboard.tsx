import React, { useState } from "react";
import Header from "../components/Header";
import Dashboard from "../components/Chat/Dashboard";
import Chat from "../components/Chat/Chat";
import InboxMessages from "../components/Chat/InboxMessages";

const DashboardLayout: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div>
      <Header />
      <Dashboard>
        {selectedChat ? (
          <Chat selectedIndex={selectedIndex} />
        ) : (
          <InboxMessages
            setSelectedChat={setSelectedChat}
            setSelectedIndex={setSelectedIndex}
          />
        )}
      </Dashboard>
    </div>
  );
};

export default DashboardLayout;
