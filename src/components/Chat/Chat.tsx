import React, { useEffect, useState } from "react";
import JP1 from "../../assets/Product.png";
import ChatDetails from "./ChatDetails";
import ChatMain from "./ChatMain";
import ChatList from "./ChatList";

interface ChatProps {
  selectedIndex: any;
}

type ChatMessage = {
  id: number;
  message: string;
  timestamp: string;
  showBadge: boolean;
  profileImage: string;
  name: string;
  messages: { text: string; sender: "user" | "seller" }[];
};

const Chat: React.FC<ChatProps> = ({ selectedIndex }) => {
  const [selectedChatId, setSelectedChatId] = useState<number>(1);

  const chatMessages: ChatMessage[] = [
    {
      id: 1,
      message: "Do you Have Questions?",
      timestamp: "12m",
      showBadge: true,
      profileImage: JP1,
      name: "Marble Queen Pothos",
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
      name: "Marble Queen Pothos",
      messages: [
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
        { text: "How can I help you?", sender: "seller" },
      ],
    },
    {
      id: 3,
      message: "Let me know your thoughts.",
      timestamp: "20m",
      showBadge: true,
      profileImage: JP1,
      name: "Marble Queen Pothos",
      messages: [
        { text: "Do you have any bulk discounts?", sender: "user" },
        {
          text: "Yes, we offer discounts on orders above $500.",
          sender: "seller",
        },
      ],
    },
  ];

  useEffect(() => {
    setSelectedChatId(selectedIndex + 1);
  }, [selectedIndex]);

  const selectedChat = chatMessages.find((chat) => chat.id === selectedChatId);

  return (
    <div className="flex h-[87vh] bg-white shadow-inner">
      {/* Chat List */}
      <div className="w-[26.5%] border-r">
        <div className="p-[27.5px] border-b">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-xl font-semibold">Inbox</h1>
            <span className="bg-gray-100 px-2 py-1 font-semibold rounded text-sm">
              12
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
