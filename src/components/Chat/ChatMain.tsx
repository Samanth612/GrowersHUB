import React from "react";
import Icons from "../../Utilities/Icons";
import SG1 from "../../assets/SG1.jpg";

type Message = {
  text: string;
  sender: "user" | "seller";
};

type ChatMainProps = {
  messages: Message[];
};

const ChatMain: React.FC<ChatMainProps> = ({ messages }) => {
  return (
    <>
      <div className="flex-1 pl-4 py-4 pr-6 lg:pr-20 max-h-[65vh] h-full overflow-y-auto">
        {/* Messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.sender === "user" ? "justify-end" : ""
            }`}
          >
            <div className="flex items-center max-w-[70%] space-x-2">
              {message.sender === "seller" && (
                <img src={SG1} alt="Seller" className="w-8 h-8 rounded-lg" />
              )}
              <div
                className={`${
                  message.sender === "user" ? "bg-green-50" : "bg-[#F1F1F1]"
                } rounded-xl px-4 py-2`}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === "user" && (
                <img src={SG1} alt="User" className="w-8 h-8 rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pl-4 py-4 pr-6 lg:pr-20">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 space-x-2">
            <button className="p-2">
              <Icons variant="Pin" />
            </button>
            <div className="flex-1 relative max-w-[90%]">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full p-3 pr-10 rounded-xl border-2 border-[#EDEDED] placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2">
                <Icons variant="messageSendButton" />
              </button>
            </div>
          </div>
          <button className="px-6 py-3 font-medium text-secondary border-2 border-secondary rounded-lg hover:bg-gray-50">
            Mark as FAQ
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatMain;
