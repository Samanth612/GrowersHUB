import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

type ChatMessage = {
  id: number;
  message: string;
  timestamp: string;
  showBadge: boolean;
  profileImage: string;
  name: string;
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
        ({ id, message, timestamp, showBadge, profileImage, name }) => (
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
                      3
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{timestamp}</span>
              </div>
              <p className="text-xs text-gray-500">{message}</p>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-5 h-5 text-secondary" />
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default ChatList;
