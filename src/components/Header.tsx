import React, { ReactNode, useState, useEffect } from "react";
import logo from "../assets/FooterLogo.png";
import plantImg from "../assets/HeroPlant.png";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AlignJustify, Heart, MapPin } from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import {
  CREATEALBUM,
  LISTINGPRODUCT,
  LOGIN,
  PROFILE,
} from "../Utilities/constantLinks";
import JoinWaitList from "./JoinWaitList";
import WhishList from "./WhishList";
import Icons from "../Utilities/Icons";
import axios from "axios";
import { CONFIG } from "../config";
import NotificationsPanel from "./NotificationPanel";
import { store } from "../Store/store";

interface WrapperProps {
  children?: ReactNode;
}

const Header: React.FC<WrapperProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setweatherLoading] = useState(false);
  const [isLocationDenied, setIsLocationDenied] = useState(false);
  const navigate = useNavigate();
  const AuthReducer = useSelector((state: any) => state.auth);
  const userData = useSelector((state: any) => state.userData.data);
  const [wishListItems, setWishListItems] = useState<any[]>([]);
  const [weatherDetails, setWeatherDetails] = useState<any>({});
  const date = new Date();
  const options: any = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navItems = ["Products", "Community", "About", "Help"];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${CONFIG?.API_ENDPOINT}/user/wishlist/`,
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      if (response?.data?.status) {
        setWishListItems([
          ...(response?.data?.data?.products || []),
          ...(response?.data?.data?.albums || []),
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherDetails = async () => {
    setweatherLoading(true);
    setIsLocationDenied(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const response = await axios.get(
              `${CONFIG?.WEATHER_API}&q=${latitude}%2C${longitude}`,
              {
                headers: {
                  "Cache-Control": "no-cache",
                },
              }
            );
            setWeatherDetails(response?.data);
            store.dispatch({
              type: "weatherDetails",
              payload: {
                data: response?.data,
              },
            });
          } catch (error) {
            console.error("Failed to fetch weather details:", error);
          } finally {
            setweatherLoading(false);
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setIsLocationDenied(true);
            alert(
              "Location access is denied. Please enable location services for better recommendations."
            );
          }
          console.error("Error getting location:", error);
          setweatherLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setweatherLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".wishlist-container")) {
        setIsWishlistOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    fetchWeatherDetails();
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <header className="fixed top-0 right-0 left-0 z-20 flex items-center justify-between px-5 lg:px-11 py-4 bg-white">
        <div className="flex items-center gap-4 laptopView:gap-16">
          <img
            src={logo}
            alt="Logo"
            className="h-14 cursor-pointer -ml-2.5 mb-2"
            onClick={() => {
              scrollTo(0, 0);
              navigate("/");
            }}
          />
          <nav className="hidden laptopviewxll:flex">
            <ul className="flex items-center gap-4 laptopView:gap-14">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={item.toLocaleLowerCase()}
                    className="text-secondary font-normal hover:text-gray-900"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="items-center gap-6 hidden laptopviewxll:flex">
          <div className="relative wishlist-container">
            <button
              className="mt-2"
              onClick={() => {
                fetchProducts();
                setIsWishlistOpen((prev) => !prev);
                setIsNotificationOpen(false);
              }}
            >
              <Heart className="w-5 h-5" />
            </button>
            {isWishlistOpen && (
              <WhishList items={wishListItems} loading={loading} />
            )}
          </div>
          <button
            className="w-5 h-5"
            onClick={() => {
              scrollTo(0, 0);
              navigate(PROFILE);
            }}
          >
            <Icons variant="Profile" strokeColor={"#212529"} />
          </button>
          <div className="relative wishlist-container">
            <button
              className="w-5 h-5 mt-2"
              onClick={() => {
                setIsNotificationOpen((prev) => !prev);
                setIsWishlistOpen(false);
              }}
            >
              <Icons variant="Notificaton" />
            </button>
            {isNotificationOpen && <NotificationsPanel />}
          </div>

          {weatherLoading ? (
            <div className="flex items-center justify-center">
              <div className="weatherloader"></div>
            </div>
          ) : isLocationDenied ? (
            <></>
          ) : (
            <div className="flex items-center justify-center px-6 py-0 border-2 rounded-[10px] border-[#EDEDED] gap-6">
              <div className="flex flex-col items-start text-teritary">
                <span>{formattedDate}</span>
                <span className="flex items-center gap-1">
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.62404 4.5C2.62404 3.18832 3.68736 2.125 4.99904 2.125C6.31071 2.125 7.37404 3.18832 7.37404 4.5C7.37404 5.81168 6.31071 6.875 4.99904 6.875C3.68736 6.875 2.62404 5.81168 2.62404 4.5ZM4.99904 2.875C4.10157 2.875 3.37404 3.60254 3.37404 4.5C3.37404 5.39746 4.10157 6.125 4.99904 6.125C5.8965 6.125 6.62404 5.39746 6.62404 4.5C6.62404 3.60254 5.8965 2.875 4.99904 2.875Z"
                      fill="#212529"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.761218 3.92843C0.938381 1.77912 2.73446 0.125 4.89105 0.125H5.10702C7.26362 0.125 9.05969 1.77912 9.23685 3.92843C9.33202 5.083 8.97538 6.22945 8.24206 7.12629L5.84552 10.0572C5.40802 10.5922 4.59005 10.5922 4.15255 10.0572L1.75602 7.12629C1.02269 6.22945 0.666048 5.083 0.761218 3.92843ZM4.89105 0.875C3.12478 0.875 1.65378 2.22974 1.50868 3.99004C1.42948 4.95096 1.7263 5.90512 2.33663 6.65154L4.73316 9.58243C4.87058 9.75048 5.1275 9.75048 5.26491 9.58243L7.66144 6.65153C8.27178 5.90512 8.5686 4.95096 8.48939 3.99004C8.34429 2.22974 6.87329 0.875 5.10702 0.875H4.89105Z"
                      fill="#212529"
                    />
                  </svg>
                  <span className="text-secondary text-xl font-medium">
                    {weatherDetails?.location?.name || "California"},
                  </span>
                </span>
              </div>
              <span className="font-semibold text-2xl">
                {`${
                  weatherDetails?.current?.temp_f
                    ? weatherDetails?.current?.temp_f
                    : "18"
                }°F`}
              </span>
            </div>
          )}
          <button
            className={`${
              !AuthReducer ? "px-11" : "px-6"
            } py-3 font-medium text-secondary border-2 border-secondary rounded-lg hover:bg-gray-50`}
            onClick={() => {
              scrollTo(0, 0);
              !AuthReducer ? navigate(LOGIN) : navigate(CREATEALBUM);
            }}
          >
            {!AuthReducer ? "Login" : "Create Album"}
          </button>
          <button
            className="px-6 py-3 text-white bg-primary font-medium rounded-lg hover:bg-green-500"
            onClick={() => {
              if (!AuthReducer) {
                scrollTo(0, 0);
                navigate(LOGIN);
              }
              scrollTo(0, 0);
              userData?.isSeller ? navigate(LISTINGPRODUCT) : openModal();
            }}
            disabled={!AuthReducer}
          >
            {userData?.isSeller ? "View Products" : "Become a Seller"}
          </button>
        </div>
        <div className="flex items-center gap-6 justify-center cursor-pointer font-medium laptopviewxll:hidden">
          <div className="items-center gap-6 flex laptopviewxll:hidden">
            <div className="relative wishlist-container">
              <button
                className="mt-2"
                onClick={() => {
                  fetchProducts();
                  setIsWishlistOpen((prev) => !prev);
                  setIsNotificationOpen(false);
                }}
              >
                <Heart className="w-5 h-5" />
              </button>
              {isWishlistOpen && (
                <WhishList items={wishListItems} loading={loading} />
              )}
            </div>
            <button
              className="w-5 h-5"
              onClick={() => {
                scrollTo(0, 0);
                navigate(PROFILE);
              }}
            >
              <Icons variant="Profile" strokeColor={"#212529"} />
            </button>
            <div className="relative wishlist-container">
              <button
                className="w-5 h-5 mt-2"
                onClick={() => {
                  setIsNotificationOpen((prev) => !prev);
                  setIsWishlistOpen(false);
                }}
              >
                <Icons variant="Notificaton" />
              </button>
              {isNotificationOpen && <NotificationsPanel />}
            </div>
          </div>
          <AlignJustify
            size={25}
            strokeWidth={1.5}
            onClick={() => setIsOpen(true)}
          />
        </div>
        {isModalOpen && (
          <Modal
            children={<JoinWaitList onClose={closeModal} />}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </header>
      {isOpen && <SidebarMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
      <main className="mt-[95px]">{children}</main>
    </div>
  );
};

export default Header;
