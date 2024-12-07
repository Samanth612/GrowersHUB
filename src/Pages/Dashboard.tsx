import React, { useState } from "react";
import Header from "../components/Header";
import Dashboard from "../components/Chat/Dashboard";
import Chat from "../components/Chat/Chat";
import JP1 from "../assets/Product.png";
import InboxMessages from "../components/Chat/InboxMessages";

interface MessageAction {
  type: string;
  label: string;
}

type ChatMessage = {
  id: number;
  message: string;
  timestamp: string;
  showBadge: boolean;
  profileImage: string;
  name: string;
  unreadCount: number;
  actions: MessageAction[];
  messages: { text: string; sender: "user" | "seller" }[];
};

const DashboardLayout: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const chatMessages: ChatMessage[] = [
    {
      id: 1,
      message: "Do you Have Questions?",
      timestamp: "12m",
      showBadge: true,
      profileImage: JP1,
      name: "Marble Queen Pothos",
      unreadCount: 3,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
      messages: [
        {
          text: "Hi, I would Like to buy this. Is it Organic?",
          sender: "user",
        },
        { text: "Yes it is", sender: "seller" },
        {
          text: "It's Home grown and here are the price details.",
          sender: "seller",
        },
        { text: "You can also check its growth here:", sender: "seller" },
      ],
    },
    {
      id: 2,
      message: "Here to assist you!",
      timestamp: "15m",
      showBadge: false,
      profileImage: JP1,
      name: "Snake Plant",
      unreadCount: 0,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
      messages: [
        { text: "How can I help you?", sender: "seller" },
        { text: "Do you have care instructions?", sender: "user" },
      ],
    },
    {
      id: 3,
      message: "Let me know your thoughts.",
      timestamp: "20m",
      showBadge: true,
      profileImage: JP1,
      name: "Fiddle Leaf Fig",
      unreadCount: 1,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
      messages: [
        { text: "Do you have any bulk discounts?", sender: "user" },
        {
          text: "Yes, we offer discounts on orders above $500.",
          sender: "seller",
        },
      ],
    },
  ];

  return (
    <div>
      <Header />
      <Dashboard>
        {selectedChat ? (
          <Chat selectedIndex={selectedIndex} chatMessages={chatMessages} />
        ) : (
          <InboxMessages
            setSelectedChat={setSelectedChat}
            setSelectedIndex={setSelectedIndex}
            messages={chatMessages}
          />
        )}
      </Dashboard>
    </div>
  );
};

export default DashboardLayout;
