import React, { useEffect, useRef, useState } from "react";
import Icons from "../../Utilities/Icons";
import SG1 from "../../assets/SG1.jpg";
import { useSelector } from "react-redux";
import { CONFIG } from "../../config";
import Modal from "../Modal";
import ChatFAQs from "./ChatFAQ";

type Message = {
  text: string;
  sender: "user" | "Seller";
  senderImage: string;
};

type ChatMainProps = {
  messages: Message[];
  onSendMessage: (text: string) => void;
  selectedChatId: any;
  productId: any;
};

const ChatMain: React.FC<ChatMainProps> = ({
  messages,
  onSendMessage,
  selectedChatId,
  productId,
}) => {
  const userData = useSelector((state: any) => state.userData.data);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [openFAQ, setOpenFAQ] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    onSendMessage(newMessage);
    setNewMessage("");

    const socket = new WebSocket(
      `${CONFIG?.WEBSOCKET}?Auth_Token=${userData?.access_token}`
    );

    socket.onopen = function () {
      socket.send(
        JSON.stringify({
          action: "SEND_MESSAGE",
          params: {
            message: newMessage,
            roomId: selectedChatId,
            message_type: "Text",
          },
        })
      );
    };

    socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex-1 pl-4 py-4 pr-6 lg:pr-12 max-h-[65vh] h-full overflow-y-auto">
        {/* Messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.sender === "user" ? "justify-end" : ""
            }`}
          >
            <div className="flex items-center max-w-[70%] space-x-2">
              {message.sender === "Seller" && (
                <img
                  src={message.senderImage || SG1}
                  alt="Seller"
                  className="w-8 h-8 rounded-lg"
                />
              )}
              <div
                className={`${
                  message.sender === "user" ? "bg-green-50" : "bg-[#F1F1F1]"
                } rounded-xl px-4 py-2`}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === "user" && (
                <img
                  src={message.senderImage || userData?.image || SG1}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              )}
            </div>
          </div>
        ))}
        {/* Ref to auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      <div className="pl-4 py-4 pr-6 lg:pr-12">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 space-x-2">
            <button className="p-2">
              <Icons variant="Pin" />
            </button>
            <div className="flex-1 relative max-w-[90%]">
              <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-3 pr-10 rounded-xl border-2 border-[#EDEDED] placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2"
                onClick={handleSendMessage}
              >
                <Icons variant="messageSendButton" />
              </button>
            </div>
          </div>
          {userData?.isSeller && (
            <button
              className="px-6 py-3 font-medium text-secondary border-2 border-secondary rounded-lg hover:bg-gray-50 hidden xll:block"
              onClick={() => setOpenFAQ(true)}
            >
              Mark as FAQ
            </button>
          )}
        </div>
      </div>
      {openFAQ && (
        <Modal
          children={
            <ChatFAQs onClose={() => setOpenFAQ(false)} productId={productId} />
          }
          onClose={() => setOpenFAQ(false)}
        />
      )}
    </>
  );
};

export default ChatMain;
