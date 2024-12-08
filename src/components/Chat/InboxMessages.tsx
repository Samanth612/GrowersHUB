import React, { useState, useEffect, useMemo } from "react";
import MessageItem from "./MessageItem";

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

interface InboxMessagesProps {
  setSelectedChat: any;
  setSelectedIndex: any;
  messages: ChatMessage[];
}

const InboxMessages: React.FC<InboxMessagesProps> = ({
  setSelectedChat,
  setSelectedIndex,
  messages,
}) => {
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

  const filteredMessages = useMemo(() => {
    let filtered = messages;
    if (filter !== "all") {
      filtered = messages.filter((message) =>
        filter === "buying"
          ? message.name.toLowerCase().includes("buy")
          : message.name.toLowerCase().includes("sell")
      );
    }
    return filtered.filter((message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filter, searchQuery, messages]);

  const searchedMessages = filteredMessages.filter((message) =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total unread count
  const totalUnreadCount = messages.reduce(
    (total, message) => total + message.unreadCount,
    0
  );

  return (
    <div className="max-w-full mx-auto bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between py-4 px-6 sm:px-12 border-b shadow-inner gap-3">
        <div className="flex items-center gap-10">
          <div className="flex">
            <h1 className="text-xl text-secondary font-semibold">Inbox</h1>
            <span className="ml-2 bg-premiumgray text-secondary text-sm px-2 py-0.5 rounded-full">
              {totalUnreadCount} {/* Show total unread count */}
            </span>
          </div>
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages"
            className="w-full max-w-[250px] sm:min-w-[320px]  px-4 py-3 bg-premiumgray rounded-lg placeholder:text-teritary focus:outline-none focus:ring-2 focus:ring-green-500"
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
      <div className="px-0 sm:px-8 max-h-[75vh] h-full overflow-y-auto">
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
