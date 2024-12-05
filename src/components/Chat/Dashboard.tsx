import React, { ReactNode, useEffect, useState } from "react";
import Icons from "../../Utilities/Icons";
import { useLocation, useNavigate } from "react-router-dom";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Inbox",
      icon: "Inbox",
      route: "inbox",
    },
    {
      title: "Create Album",
      icon: "CreateAlbum",
      route: "createalbum",
    },
    {
      title: "Your Album",
      icon: "YourAlbum",
      route: "youralbum",
    },
    {
      title: "Subscriptions",
      icon: "Subscriptions",
      route: "subscriptions",
    },
  ];

  // Determine selected index based on location
  const [selectedIndex, setSelectedIndex] = useState<number>(
    menuItems.findIndex((item) => location.pathname.includes(item.route))
  );

  useEffect(() => {
    const index = menuItems.findIndex((item) =>
      location.pathname.includes(item.route)
    );
    setSelectedIndex(index);
  }, [location.pathname]);

  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <aside className="w-[22%] min-h-[88vh] bg-white shadow-inner border-r">
        <nav className="p-4">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${item.route}`);
                  }}
                  className={`flex items-center cursor-pointer gap-3 p-4 rounded-lg transition-colors duration-200 
                    ${
                      location.pathname.includes(item.route)
                        ? "bg-[#6FEE8F21] text-primary font-semibold"
                        : "hover:bg-[#6FEE8F21] text-teritary"
                    }
                  `}
                >
                  <span className={`${index === 0 && "-translate-x-0.5"}`}>
                    <Icons
                      variant={item.icon}
                      strokeColor={
                        selectedIndex === index ? "#00701C" : "#808080"
                      }
                    />
                  </span>
                  <span
                    className={`${index === 1 ? "ml-3" : "ml-2"} ${
                      location.pathname.includes(item.route)
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
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Dashboard;
