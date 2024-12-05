import React, { useState } from "react";
import Icons from "../../Utilities/Icons";
import InboxMessages from "./InboxMessages";
import Chat from "./Chat";

const Dashboard: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedChat, setSelectedChat] = useState(false);

  const menuItems = [
    {
      title: "Inbox",
      icon: (
        <Icons
          variant="Inbox"
          strokeColor={selectedIndex === 0 ? "#00701C" : "#808080"}
        />
      ),
      color: `${
        selectedIndex === 0 ? "text-primary font-bold" : "text-teritary"
      }`,
    },
    {
      title: "Create Album",
      icon: (
        <Icons
          variant="CreateAlbum"
          strokeColor={selectedIndex === 1 ? "#00701C" : "#808080"}
        />
      ),
      color: `${
        selectedIndex === 1 ? "text-primary font-bold" : "text-teritary"
      }`,
    },
    {
      title: "Your Album",
      icon: (
        <Icons
          variant="YourAlbum"
          strokeColor={selectedIndex === 2 ? "#00701C" : "#808080"}
        />
      ),
      color: `${
        selectedIndex === 2 ? "text-primary font-bold" : "text-teritary"
      }`,
    },
    {
      title: "Subscriptions",
      icon: (
        <Icons
          variant="Subscriptions"
          strokeColor={selectedIndex === 3 ? "#00701C" : "#808080"}
        />
      ),
      color: `${
        selectedIndex === 3 ? "text-primary font-bold" : "text-teritary"
      }`,
    },
  ];

  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-inner border-r">
        <nav className="p-4">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => setSelectedIndex(index)}
                  className={`flex items-center gap-3 p-4 rounded-lg transition-colors duration-200 
                    ${
                      selectedIndex === index
                        ? "bg-[#6FEE8F21] text-primary font-semibold"
                        : "hover:bg-[#6FEE8F21] text-teritary"
                    }
                  `}
                >
                  <span className={`${index === 0 && "-translate-x-0.5"}`}>
                    {item.icon}
                  </span>
                  <span
                    className={`${index === 1 ? "ml-3" : "ml-2"} ${
                      selectedIndex === index
                        ? "text-primary font-bold"
                        : "font-medium"
                    }`}
                  >
                    {item.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full">
        {selectedChat ? (
          <Chat selectedIndex={selectedIndex} />
        ) : (
          <InboxMessages
            setSelectedChat={setSelectedChat}
            setSelectedIndex={setSelectedIndex}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
