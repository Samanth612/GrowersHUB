import React, { ReactNode, useEffect, useState } from "react";
import Icons from "../../Utilities/Icons";
import { useLocation, useNavigate } from "react-router-dom";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const seller = false;

  const allMenuItems = [
    {
      title: "Your Listings",
      shortTitle: "Listings",
      icon: "Listing",
      route: "listing",
    },
    {
      title: "Inbox",
      shortTitle: "Inbox",
      icon: "Inbox",
      route: "inbox",
    },
    {
      title: "Create Album",
      shortTitle: "Create",
      icon: "CreateAlbum",
      route: "createalbum",
    },
    {
      title: "Your Album",
      shortTitle: "Album",
      icon: "YourAlbum",
      route: "youralbum",
    },
    {
      title: "Subscriptions",
      shortTitle: "Subscriptions",
      icon: "Subscriptions",
      route: "subscriptions",
    },
  ];

  const menuItems = seller
    ? allMenuItems
    : allMenuItems.filter((item) => item.route !== "listing");

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
    <>
      <div className="bg-white hidden xll:flex">
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
                    className={`flex items-center cursor-pointer ${
                      seller ? "gap-1" : "gap-3"
                    } p-4 rounded-lg transition-colors duration-200 
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
                      className={`${
                        seller
                          ? index === 2
                            ? "ml-5"
                            : "ml-4"
                          : index === 1
                          ? "ml-3"
                          : "ml-2"
                      } ${
                        location.pathname.includes(item.route)
                          ? "text-primary font-bold"
                          : "font-medium"
                      }`}
                    >
                      {window.innerWidth >= 1180
                        ? item.title
                        : ["createalbum", "youralbum", "listing"].includes(
                            item.route
                          )
                        ? item.shortTitle
                        : item.title}
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
      <main className="w-full min-h-screen pb-20 overflow-y-auto xll:hidden">
        {children}
      </main>
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 sm:gap-8 px-2 md:px-12 py-4 bg-white shadow-lg xll:hidden">
        <nav>
          <ul className={`flex items-center ${seller ? "gap-3" : "gap-8"}`}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${item.route}`);
                  }}
                  className={`flex flex-col items-center cursor-pointer gap-3 p-2 rounded-lg transition-colors duration-200 
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
                    className={`${
                      location.pathname.includes(item.route)
                        ? "text-primary font-bold"
                        : "font-medium"
                    } text-xs`}
                  >
                    {window.innerWidth >= 1180
                      ? item.title
                      : ["createalbum", "youralbum", "listing"].includes(
                          item.route
                        )
                      ? item.shortTitle
                      : item.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Dashboard;
