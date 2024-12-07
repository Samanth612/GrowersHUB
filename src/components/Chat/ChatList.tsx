import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

type ChatMessage = {
  id: number;
  message: string;
  timestamp: string;
  showBadge: boolean;
  profileImage: string;
  name: string;
  unreadCount: number;
};

type ChatListProps = {
  chats: ChatMessage[];
  selectedChatId: number;
  onSelectChat: (id: number) => void;
};

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
}) => {
  const [filter, setFilter] = useState<string>("all");
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const handleMenuToggle = (chatId: number) => {
    setMenuOpenId(menuOpenId === chatId ? null : chatId);
  };

  const handleAction = (chatId: number, action: string) => {
    console.log(`Performing ${action} on chat ${chatId}`);
    setMenuOpenId(null); // Close the menu after the action
  };

  return (
    <div className="p-4 max-h-[74.281vh] h-full overflow-y-auto">
      <div className="bg-gray-100 rounded-xl py-[10px] px-5 mb-4">
        <input
          type="text"
          placeholder="Search messages"
          className="w-full bg-transparent outline-none placeholder:text-teritary"
        />
      </div>

      <div className="flex space-x-2 mb-4">
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
      {chats.map(
        ({
          id,
          message,
          timestamp,
          showBadge,
          profileImage,
          name,
          unreadCount,
        }) => (
          <div
            key={id}
            className={`flex items-start space-x-3 p-3 rounded-[10px] cursor-pointer ${
              selectedChatId === id ? "bg-premiumgray" : "hover:bg-premiumgray"
            }`}
            onClick={() => onSelectChat(id)}
          >
            <img
              src={profileImage}
              alt="User"
              className="w-10 h-10 aspect-square rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm whitespace-nowrap">
                    {name}
                  </span>
                  {showBadge && (
                    <span className="bg-premiumgreen text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{timestamp}</span>
              </div>
              <p className="text-xs text-gray-500">{message}</p>
            </div>

            {/* More Vertical Menu Button */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent closing the menu when clicking this button
                  handleMenuToggle(id);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <MoreVertical className="w-5 h-5 text-secondary" />
              </button>

              {/* Dropdown Menu */}
              {menuOpenId === id && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                  <div className="py-2">
                    <button
                      onClick={() => handleAction(id, "archive")}
                      className="block w-full text-left px-4 py-2 text-sm text-teritary"
                    >
                      Archive
                    </button>
                    <button
                      onClick={() => handleAction(id, "mark-read")}
                      className="block w-full text-left px-4 py-2 text-sm text-teritary"
                    >
                      Mark as Read
                    </button>
                    <button
                      onClick={() => handleAction(id, "pin")}
                      className="block w-full text-left px-4 py-2 text-sm text-teritary"
                    >
                      Pin to top
                    </button>
                    <button
                      onClick={() => handleAction(id, "delete")}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ChatList;
