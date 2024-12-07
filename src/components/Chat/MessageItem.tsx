import { MoreVertical } from "lucide-react";
import React from "react";

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

interface MessageItemProps {
  message: ChatMessage;
  isMenuOpen: boolean;
  onMenuToggle: (messageId: number) => void;
  onAction: (messageId: number, actionType: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isMenuOpen,
  onMenuToggle,
  onAction,
}) => (
  <div className="flex items-center p-4 mb-4 hover:bg-premiumgray hover:rounded-[10px] relative">
    {/* Image */}
    <div className="flex-shrink-0 mr-4">
      <img
        src={message.profileImage || "/api/placeholder/48/48"}
        alt={message.name}
        className="w-12 h-12 rounded-full object-cover"
      />
    </div>
    {/* Message Content */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center">
        <h3 className="text-sm font-medium text-secondary">{message.name}</h3>
        {message.unreadCount > 0 && (
          <span className="ml-2 bg-premiumgreen text-primary text-xs font-medium px-2 py-0.5 rounded-full">
            {message.unreadCount}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 truncate">{message.message}</p>
    </div>
    {/* Action Menu */}
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing the menu when clicking this button
          onMenuToggle(message.id);
        }}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <MoreVertical className="w-5 h-5 text-secondary" />
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-2">
            {message.actions.map((action) => (
              <button
                key={action.label}
                onClick={() => onAction(message.id, action.type)}
                className={`block w-full font-medium text-left px-4 py-2 text-sm ${
                  action.type === "delete" ? "text-red-600" : "text-teritary"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default MessageItem;
