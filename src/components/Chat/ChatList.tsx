import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import axios from "axios";
import { CONFIG } from "../../config";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import pin from "../../assets/pin.png";

type ChatMessage = {
  id: number;
  message: string;
  timestamp: string;
  showBadge: boolean;
  profileImage: string;
  name: string;
  unreadCount: number;
  unpin?: any;
  productId: string;
  chatType?: string;
  user?: any;
};

type ChatListProps = {
  chats: ChatMessage[];
  selectedChatId: number;
  onSelectChat: (id: number) => void;
  setChatMessages: any;
  setLoading: any;
  loading: any;
  filter: any;
  setFilter: any;
};

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
  filter,
  setFilter,
  setChatMessages,
  loading,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const userData = useSelector((state: any) => state.userData.data);

  const handleMenuToggle = (chatId: number) => {
    setMenuOpenId(menuOpenId === chatId ? null : chatId);
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
            const updatedChats = chats.filter((chat) => chat.id !== roomId);
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
            const pinnedChat = chats.find((chat) => chat.id === roomId);
            if (pinnedChat) {
              pinnedChat.unpin = true;
            }

            const remainingChats = chats.filter((chat) => chat.id !== roomId);
            const updatedChats = pinnedChat
              ? [{ ...pinnedChat }, ...remainingChats]
              : chats;

            setChatMessages(updatedChats);

            toast.success(
              res?.data?.message || "Chat room pinned to the top successfully"
            );
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
            const unpinnedChat = chats.find((chat) => chat.id === roomId);
            if (unpinnedChat) {
              delete unpinnedChat.unpin; // Remove the `unpin` flag if present
            }

            const updatedChats = chats
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

  // Filter chats based on search query and active filter
  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleSelectChat = (id: number) => {
    onSelectChat(id);
    // Reset the unread count of the selected chat
    const updatedChats = chats.map((chat) =>
      chat.id === id ? { ...chat, unreadCount: 0 } : chat
    );
    setChatMessages(updatedChats); // Update the chats state
  };

  return (
    <div className="p-4 max-h-[74.281vh] h-full overflow-y-auto">
      {/* Search Input */}
      <div className="bg-gray-100 rounded-xl py-[10px] px-5 mb-4">
        <input
          type="text"
          placeholder="Search messages"
          className="w-full bg-transparent outline-none placeholder:text-teritary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>
      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-4">
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
      {/* Chat List */}
      {loading ? (
        <div className="flex items-center justify-center max-h-[74.281vh] h-full">
          <div className="loader"></div>
        </div>
      ) : (
        filteredChats.map(
          ({
            id,
            message,
            timestamp,
            profileImage,
            name,
            unreadCount,
            unpin,
            chatType,
            user,
          }) => (
            <div
              key={id}
              className={`flex items-start space-x-3 p-3 rounded-[10px] cursor-pointer ${
                selectedChatId === id
                  ? "bg-premiumgray"
                  : "hover:bg-premiumgray"
              }`}
              onClick={() => handleSelectChat(id)}
            >
              <img
                src={chatType === "User" ? user?.image : profileImage}
                alt="User"
                className="w-10 h-10 aspect-square rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium flex text-sm whitespace-nowrap text-pretty">
                      {chatType === "User" ? user?.name : name}
                      {unpin && (
                        <span className="ml-2">
                          <img src={pin} alt="pin" className="w-5 h-5" />
                        </span>
                      )}
                    </span>
                    {unreadCount > 0 && (
                      <span className="bg-premiumgreen text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {timestamp === "N/A" ? "" : timestamp}
                  </span>
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
                        onClick={() =>
                          handleAction(id, unpin ? "unpin" : "pin")
                        }
                        type="button"
                        className="block w-full text-left px-4 py-2 text-sm text-teritary"
                      >
                        {unpin ? "Unpin" : "Pin to top"}
                      </button>
                      <button
                        onClick={() => handleAction(id, "delete")}
                        type="button"
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
        )
      )}
    </div>
  );
};

export default ChatList;
