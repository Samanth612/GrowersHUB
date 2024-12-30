import React, { useEffect, useState, useMemo, useRef } from "react";
import ChatDetails from "./ChatDetails";
import ChatMain from "./ChatMain";
import ChatList from "./ChatList";
import { CONFIG } from "../../config";
import { useSelector } from "react-redux";

interface ChatProps {
  selectedIndex: number;
  setSelectedIndex: any;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  chatFrom: any;
  setLoading: any;
  loading: any;
  filter: any;
  setFilter: any;
  msgLoading: any;
  setSelectedChat: any;
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
  productId: string;
  unpin?: any;
  actions: MessageAction[];
  messages: { text: string; sender: "user" | "seller" }[];
  location?: any;
  chatType?: string;
  user?: any;
};

const Chat: React.FC<ChatProps> = ({
  selectedIndex,
  setSelectedIndex,
  chatMessages,
  setChatMessages,
  chatFrom,
  setLoading,
  loading,
  filter,
  setFilter,
  msgLoading,
  setSelectedChat,
}) => {
  const [messages, setMessages] = useState<any[]>(
    chatMessages[selectedIndex]?.messages || []
  );
  const totalUnreadCount = useSelector((state: any) => state.unreadCount);

  const selectedChat = useMemo(
    () => chatMessages.find((chat) => chat.id === selectedIndex),
    [selectedIndex, chatMessages]
  );

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Define newMessage with the correct sender type
    const newMessage: { text: string; sender: "user" } = {
      text: text,
      sender: "user",
    };

    // Update the local messages state
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Update global chatMessages state
    setChatMessages((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedIndex
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
  };

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
          selectedChatId={selectedIndex}
          onSelectChat={setSelectedIndex}
          setChatMessages={setChatMessages}
          setLoading={setLoading}
          loading={loading}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      {/* Main Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {msgLoading ? (
            <div className="flex items-center justify-center h-[75vh]">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              <ChatDetails
                chat={selectedChat}
                chatFrom={chatFrom}
                setSelectedChat={setSelectedChat}
              />
              <ChatMain
                messages={messages}
                onSendMessage={handleSendMessage}
                selectedChatId={selectedIndex}
                productId={selectedChat?.productId}
              />
            </>
          )}
        </div>
      ) : (
        <div className="bg-white flex flex-1 items-center shadow-inner justify-center">
          <div className="text-center p-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
              <svg
                className="w-12 h-12"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 2C9.165 2 2 8.73 2 17.055c0 4.985 2.485 9.415 6.36 12.285v4.66l5.81-3.19c1.225 0.34 2.52 0.525 3.86 0.525 8.835 0 16-6.73 16-15.055C34 8.73 26.835 2 18 2z"
                  fill="#00701C"
                />
                <path
                  d="M19.33 22l-4.335-4.62-8.385 4.62 9.225-9.815 4.44 4.62 8.28-4.62L19.33 22z"
                  fill="white"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-secondary mb-2">
              Your messages
            </h1>
            <p className="text-teritary mb-6">
              Send a message to start a chat.
            </p>
            <button
              type="button"
              className="bg-primary hover:bg-green-500 text-white px-4 py-2 rounded transition-colors duration-200"
              onClick={() => setSelectedIndex(chatMessages[0]?.id)}
            >
              Send message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
