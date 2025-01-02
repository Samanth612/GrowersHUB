import React, { useState, useEffect, useMemo } from "react";
import MessageItem from "./MessageItem";
import { useSelector } from "react-redux";
import axios from "axios";
import { CONFIG } from "../../config";
import { useLocation } from "react-router";
import toast from "react-hot-toast";

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
  productId: string;
  unpin?: any;
  actions: MessageAction[];
  messages: { text: string; sender: "user" | "seller" }[];
  chatType?: string;
  user?: any;
};

interface InboxMessagesProps {
  setSelectedChat: any;
  setSelectedIndex: any;
  messages: ChatMessage[];
  setChatMessages: any;
  setChatFrom: any;
  setLoading: any;
  setFilter: any;
  filter: any;
  searchQuery: any;
  setSearchQuery: any;
}

const InboxMessages: React.FC<InboxMessagesProps> = ({
  setSelectedChat,
  setSelectedIndex,
  messages,
  setChatFrom,
  setFilter,
  filter,
  setChatMessages,
  searchQuery,
  setSearchQuery,
}) => {
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const userData = useSelector((state: any) => state.userData.data);
  const totalUnreadCount = useSelector((state: any) => state.unreadCount);

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

  const handleAction = (roomId: number, action: string) => {
    if (action === "delete") {
      axios
        .post(
          `${CONFIG?.CHAT_BASE_URL}/chat/clear/`,
          { roomId: roomId },
          {
            headers: {
              Authorization: `Bearer ${userData?.access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res?.status) {
            const updatedChats = messages.filter((chat) => chat.id !== roomId);
            setChatMessages(updatedChats);
            toast.success("Chat room deleted successfully");
          }
        })
        .catch((err: any) => {
          toast.error(
            err?.response?.data?.message || "Failed to delete chat room"
          );
        });
    } else if (action === "pin") {
      axios
        .post(
          `${CONFIG?.CHAT_BASE_URL}/chat/pin/${roomId}`,
          { roomId: roomId },
          {
            headers: {
              Authorization: `Bearer ${userData?.access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res?.status) {
            const pinnedChat = messages.find((chat) => chat.id === roomId);
            const remainingChats = messages.filter(
              (chat) => chat.id !== roomId
            );
            const updatedChats = pinnedChat
              ? [pinnedChat, ...remainingChats]
              : messages;

            setChatMessages(updatedChats);
            toast.success("Chat room pinned to the top successfully");
          }
        })
        .catch((err: any) => {
          toast.error(
            err?.response?.data?.message || "Failed to pin chat room"
          );
        });
    } else if (action === "unpin") {
      axios
        .post(
          `${CONFIG?.CHAT_BASE_URL}/chat/unpin/${roomId}`,
          { roomId: roomId },
          {
            headers: {
              Authorization: `Bearer ${userData?.access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res?.status) {
            const unpinnedChat = messages.find((chat) => chat.id === roomId);
            if (unpinnedChat) {
              delete unpinnedChat.unpin; // Remove the `unpin` flag if present
            }

            const updatedChats = messages
              .filter((chat) => chat.id !== roomId)
              .concat(unpinnedChat ? [{ ...unpinnedChat }] : []);

            setChatMessages(updatedChats);

            toast.success(
              res?.data?.message || "Chat room unpinned successfully"
            );
          }
        })
        .catch((err: any) => {
          toast.error(
            err?.response?.data?.message || "Failed to unpin chat room"
          );
        });
    }

    setMenuOpenId(null);
  };

  const searchedMessages = messages.filter((chat) => {
    const matchesSearch = chat.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="max-w-full mx-auto bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between py-4 px-6 sm:px-12 border-b shadow-inner gap-3">
        <div className="flex items-center gap-10">
          <div className="flex">
            <h1 className="text-xl text-secondary font-semibold">Inbox</h1>
            <span className="ml-2 bg-premiumgray text-secondary text-sm px-2 py-0.5 rounded-full">
              {totalUnreadCount}
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
          {["all", "buying", "selling", "user"].map((filterType) => (
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
      <div className="px-0 sm:px-8 min-h-[75vh] h-full overflow-y-auto">
        {searchedMessages.map((message, index) => (
          <div
            onClick={() => {
              setSelectedChat(true);
              setSelectedIndex(message.id);
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
