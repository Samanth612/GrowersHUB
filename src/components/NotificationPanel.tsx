import React, { useEffect, useState } from "react";
import { CONFIG } from "../config";
import { useSelector } from "react-redux";
import axios from "axios";
import Profile from "../assets/NotificationProfile.png";
import { INBOX } from "../Utilities/constantLinks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type NotificationItemProps = {
  icon: any;
  title: string;
  subtitle?: string;
  actionButton?: string;
  time: string;
  link: string;
};

const NotificationItem: React.FC<
  NotificationItemProps & {
    onActionClick?: () => void;
  }
> = ({ icon, title, subtitle, actionButton, time, onActionClick }) => (
  <div className="flex items-center gap-4 p-4 border-b border-gray-100">
    <img src={icon} alt="icon" />
    <div className="flex-1">
      <p className="text-secondary font-medium">
        {title?.replace("undefined", "Jack")}
      </p>
      {subtitle && <p className="text-teritary text-sm">{subtitle}</p>}
      {actionButton && (
        <button
          className="mt-2 bg-primary font-medium hover:bg-green-500 text-white px-4 py-1 rounded"
          onClick={onActionClick}
        >
          {actionButton}
        </button>
      )}
      <p className="text-teritary font-medium text-sm mt-1">{time}</p>
    </div>
  </div>
);

const NotificationsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [productLength, setProductLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const userData = useSelector((state: any) => state.userData.data);
  const LatestNotification = useSelector(
    (state: any) => state.LatestNotificationData
  );
  const navigate = useNavigate();

  // Fetch notifications from the server
  const fetchNotifications = async () => {
    const skip = (currentPage - 1) * itemsPerPage;

    try {
      setLoading(true);

      const response = await axios.get(
        `${CONFIG?.CHAT_BASE_URL}/notification?skip=${skip}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      if (response.data.status) {
        const transformedNotifications = response.data.data.data.map(
          (item: any) => ({
            icon: Profile,
            title: item.message,
            actionButton: item.type,
            time: item.createdAt ? getTimeAgo(item.createdAt) : "Unknown time",
            link: item.link,
            id: item._id,
          })
        );

        setNotifications(transformedNotifications);
        setProductLength(response.data.data.totalCount);
      } else {
        setNotifications([]);
        setProductLength(0);
      }
    } catch (error) {
      setNotifications([]);
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add LatestNotification to the notification list
  useEffect(() => {
    if (LatestNotification) {
      const latestNotif = {
        icon: Profile,
        title: LatestNotification.message,
        actionButton: LatestNotification.type,
        time: getTimeAgo(LatestNotification.createdAt),
        link: LatestNotification.link,
        id: LatestNotification._id,
      };

      setNotifications((prevNotifications) => [
        latestNotif,
        ...prevNotifications,
      ]);
    }
  }, [LatestNotification]);

  // WebSocket connection for new notifications
  const Getnotifications = () => {
    const socket = new WebSocket(
      `${CONFIG?.WEBSOCKET}?Auth_Token=${userData?.access_token}`
    );

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          action: "JOIN_NOTIFICATION",
        })
      );
    };

    socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      console.log(data, "Data");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed.");
    };
  };

  const getTimeAgo = (timestamp: string) => {
    const createdAt = new Date(timestamp);
    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - createdAt.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return `${seconds}s`;
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  useEffect(() => {
    Getnotifications();
    fetchNotifications();
  }, [userData?.access_token, currentPage, itemsPerPage]);

  const handleActionClick = (link: string, notificationId: string) => {
    axios
      .post(
        `${CONFIG?.CHAT_BASE_URL}/notification/read/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const updatedNotifications = notifications?.filter(
          (item) => item.id !== notificationId
        );
        setNotifications(updatedNotifications);
        scrollTo(0, 0);
        navigate(INBOX, { state: link });
      })
      .catch((err: any) => toast.error(err?.response?.data?.message));
  };

  return (
    <div className="scale-75">
      <div className="absolute top-0 mt-2 -right-20 min-w-[420px] bg-white shadow-lg rounded-lg z-30 max-h-[720px] overflow-hidden laptopviewxll:right-0">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h1 className="text-xl font-semibold">Notifications</h1>
          <button className="inline-flex gap-0.5 items-center text-sm font-medium text-secondary">
            Mark all as read
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 8C14 4.6875 11.3125 2 8 2C4.6875 2 2 4.6875 2 8C2 11.3125 4.6875 14 8 14C11.3125 14 14 11.3125 14 8Z"
                stroke="#212529"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <path
                d="M11 5.5L6.8 10.5L5 8.5"
                stroke="#212529"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <>
          {loading ? (
            <div className="flex items-center justify-center h-full min-h-[calc(40rem-56px)]">
              <div className="loader"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[calc(40rem-56px)]">
              <p className="text-gray-500 text-lg font-medium">
                🎉 No notifications to show!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 overflow-y-auto max-h-[calc(40rem-56px)]">
              {notifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  {...notification}
                  onActionClick={() =>
                    handleActionClick(notification.link, notification.id)
                  }
                />
              ))}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default NotificationsPanel;
