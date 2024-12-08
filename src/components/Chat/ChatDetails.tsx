import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";

type ChatMessage = {
  id: number;
  message: string;
  timestamp: string;
  showBadge: boolean;
  profileImage: string;
  name: string;
};

type ChatDetailsProps = {
  chat: ChatMessage;
  setSelectedChat: any;
};

const ChatDetails: React.FC<ChatDetailsProps> = ({ chat, setSelectedChat }) => {
  return (
    <div className="pl-4 py-4 pr-6 lg:pr-20 border-b flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4  xll:hidden">
        <button
          className="flex items-center text-secondary gap-3"
          onClick={() => setSelectedChat(false)}
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="font-semibold">Back</span>
        </button>
        <div className="flex items-center space-x-3">
          <img
            src={chat.profileImage}
            alt="User"
            className="w-12 h-12 aspect-square rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">{chat.name}</h2>
            <div className="flex items-center gap-1 text-teritary">
              <MapPin className="w-4 h-4" />
              <span className="text-sm text-teritary">
                {"San Ramon, California, 20 Miles away"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden xll:flex items-center space-x-3">
        <img
          src={chat.profileImage}
          alt="User"
          className="w-12 h-12 aspect-square rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-lg">{chat.name}</h2>
          <div className="flex items-center gap-1 text-teritary">
            <MapPin className="w-4 h-4" />
            <span className="text-sm text-teritary">
              {"San Ramon, California, 20 Miles away"}
            </span>
          </div>
        </div>
      </div>
      <button className="px-6 py-3 font-medium text-secondary border-2 border-secondary rounded-lg hover:bg-gray-50 hidden xll:block">
        More Details
      </button>
    </div>
  );
};

export default ChatDetails;
