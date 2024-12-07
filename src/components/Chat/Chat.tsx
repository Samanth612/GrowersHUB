import React, { useEffect, useState, useMemo } from "react";
import ChatDetails from "./ChatDetails";
import ChatMain from "./ChatMain";
import ChatList from "./ChatList";

interface ChatProps {
  selectedIndex: number;
  chatMessages: ChatMessage[];
}

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

const Chat: React.FC<ChatProps> = ({ selectedIndex, chatMessages }) => {
  const [selectedChatId, setSelectedChatId] = useState<number>(1);

  useEffect(() => {
    setSelectedChatId(selectedIndex + 1);
  }, [selectedIndex]);

  const selectedChat = useMemo(
    () => chatMessages.find((chat) => chat.id === selectedChatId),
    [selectedChatId, chatMessages]
  );

  const totalUnreadCount = useMemo(
    () => chatMessages.reduce((total, chat) => total + chat.unreadCount, 0),
    [chatMessages]
  );

  return (
    <div className="flex h-[87vh] bg-white shadow-inner">
      {/* Chat List */}
      <div className="w-[30%] border-r hidden xll:block">
        <div className="p-[27.5px] border-b">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-xl font-semibold">Inbox</h1>
            <span className="bg-gray-100 px-2 py-1 font-semibold rounded text-sm">
              {totalUnreadCount}
            </span>
          </div>
        </div>
        <ChatList
          chats={chatMessages}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
        />
      </div>

      {/* Main Chat Area */}
      {selectedChat && (
        <div className="flex-1 flex flex-col">
          {/* Chat Details */}
          <ChatDetails chat={selectedChat} />
          {/* Chat Main */}
          <ChatMain messages={selectedChat.messages} />
        </div>
      )}
    </div>
  );
};

export default Chat;
