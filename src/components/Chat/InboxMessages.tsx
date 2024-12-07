import React, { useState, useEffect } from "react";
import MessageItem from "./MessageItem";
import JP1 from "../../assets/Product.png";

interface InboxMessagesProps {
  setSelectedChat: any;
  setSelectedIndex: any;
}

interface MessageAction {
  type: string;
  label: string;
}

interface Message {
  id: number;
  title: string;
  subtitle: string;
  image?: string;
  unreadCount: number;
  actions: MessageAction[];
}

const InboxMessages: React.FC<InboxMessagesProps> = ({
  setSelectedChat,
  setSelectedIndex,
}) => {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      title: "Marble Queen Pothos",
      subtitle: "Do you Have Questions?",
      image: JP1,
      unreadCount: 3,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 2,
      title: "Snake Plant",
      subtitle: "Care Tips Inside!",
      image: JP1,
      unreadCount: 0,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 3,
      title: "Fiddle Leaf Fig",
      subtitle: "Brighten Your Room",
      image: JP1,
      unreadCount: 5,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 4,
      title: "Monstera Deliciosa",
      subtitle: "Let it Shine!",
      image: JP1,
      unreadCount: 2,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 5,
      title: "Peace Lily",
      subtitle: "Low Light, No Problem",
      image: JP1,
      unreadCount: 1,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 6,
      title: "ZZ Plant",
      subtitle: "Perfect for Beginners",
      image: JP1,
      unreadCount: 4,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 7,
      title: "Golden Pothos",
      subtitle: "Vibrant and Easy",
      image: JP1,
      unreadCount: 0,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 8,
      title: "Calathea Medallion",
      subtitle: "Beauty in Patterns",
      image: JP1,
      unreadCount: 3,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 9,
      title: "Spider Plant",
      subtitle: "Classic Indoor Plant",
      image: JP1,
      unreadCount: 6,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 10,
      title: "Philodendron Brasil",
      subtitle: "Colorful and Bold",
      image: JP1,
      unreadCount: 0,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 11,
      title: "Chinese Money Plant",
      subtitle: "Unique and Stylish",
      image: JP1,
      unreadCount: 2,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 12,
      title: "Jade Plant",
      subtitle: "Good Luck Charm",
      image: JP1,
      unreadCount: 1,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 13,
      title: "Aloe Vera",
      subtitle: "Medicinal and Hardy",
      image: JP1,
      unreadCount: 5,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
    {
      id: 14,
      title: "Pilea Peperomioides",
      subtitle: "Quirky and Fun",
      image: JP1,
      unreadCount: 4,
      actions: [
        { type: "archive", label: "Archive" },
        { type: "mark-read", label: "Mark as Read" },
        { type: "pin", label: "Pin to top" },
        { type: "delete", label: "Delete" },
      ],
    },
  ]);

  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Close the menu on clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setMenuOpenId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = (messageId: number) => {
    setMenuOpenId(menuOpenId === messageId ? null : messageId);
  };

  const handleAction = (messageId: number, actionType: string) => {
    console.log(`Performing ${actionType} on message ${messageId}`);
    setMenuOpenId(null); // Close the menu after action
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === "all") return true;
    // Example filtering logic (customize as per your needs)
    if (filter === "buying") return message.title.toLowerCase().includes("buy");
    if (filter === "selling")
      return message.title.toLowerCase().includes("sell");
    return true;
  });

  const searchedMessages = filteredMessages.filter((message) =>
    message.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-full mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center justify-between py-4 px-12 border-b shadow-inner">
        <div className="flex items-center gap-10">
          <div className="flex">
            <h1 className="text-xl text-secondary font-semibold">Inbox</h1>
            <span className="ml-2 bg-premiumgray text-secondary text-sm px-2 py-0.5 rounded-full">
              {messages.length}
            </span>
          </div>
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages"
            className="w-[320px] px-4 py-3 bg-premiumgray rounded-lg placeholder:text-teritary focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {["all", "buying", "selling"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-1 rounded-md ${
                filter === filterType
                  ? "text-primary font-medium bg-premiumgreen"
                  : "text-secondary border border-primary hover:bg-premiumgray"
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Message List */}
      <div className="px-8 max-h-[75vh] h-full overflow-y-auto">
        {searchedMessages.map((message, index) => (
          <div
            onClick={() => {
              setSelectedChat(true);
              setSelectedIndex(index);
            }}
            key={index}
          >
            <MessageItem
              key={message.id}
              message={message}
              isMenuOpen={menuOpenId === message.id}
              onMenuToggle={handleMenuToggle}
              onAction={handleAction}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxMessages;
