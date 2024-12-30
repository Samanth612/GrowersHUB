import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CONFIG } from "../../config";
import Header from "../Header";
import Dashboard from "../../Pages/Dashboard";
import Chat from "./Chat";
import InboxMessages from "./InboxMessages";
import { store } from "../../Store/store";

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
  actions: MessageAction[];
  messages: { text: string; sender: "user" | "seller" }[];
  chatType?: string;
  user?: any;
  location?: any;
};

const DashboardLayout: React.FC = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [chatFrom, setChatFrom] = useState(false);
  const [selectedChat, setSelectedChat] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msgLoading, setMsgLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    // Initial state here (your mock data)
  ]);
  const location = useLocation();

  const userData = useSelector((state: any) => state.userData.data);
  const UpdatedChatList = useSelector(
    (state: any) => state.UpdatedChatList?.data
  );

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

  const transformData = async (data: any[]) => {
    const transformedData = await Promise.all(
      data.map(async (item: any) => {
        const defaultResponse = {
          id: item?._id,
          message: item.last_message?.[0]?.message || "",
          timestamp: item.last_message?.[0]?.createdAt
            ? getTimeAgo(item.last_message[0].createdAt)
            : "N/A",
          showBadge: item.unread_count > 0,
          profileImage: item.product?.images || "default_image_url",
          name: item.name || "Unknown Name",
          unreadCount: item.unread_count || 0,
          productId: item?.product?._id,
          unpin: item?.userPinned,
          actions: [
            { type: "pin", label: "Pin to top" },
            { type: "delete", label: "Delete" },
          ],
          chatType: item.productType,
          user: item.user,
          messages: [],
          location: item?.location,
        };
        return defaultResponse;
      })
    );
    return transformedData;
  };

  const fetchMessages = async (selectedIndex: any) => {
    setMsgLoading(true);

    try {
      const response = await axios.get(
        `${CONFIG?.CHAT_BASE_URL}/chat/get/${selectedIndex}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      if (
        response?.data?.status === "success" &&
        response?.data?.data?.length > 0
      ) {
        const messages =
          response.data?.data
            ?.map((msg: any) => ({
              id: msg._id,
              text: msg.message,
              sender: msg.you ? "user" : "Seller",
              senderImage:
                msg.sender_image || "https://example.com/default-image.jpg",
              messageType: msg.message_type || "Text",
              timestamp: msg.createdAt
                ? getTimeAgo(msg.createdAt)
                : "Unknown time",
              product: msg.product || {},
              you: msg.you || false,
              isBlocked: msg.isBlocked || false,
              isReadByOthers: msg.isReadByOthers || false,
            }))
            .reverse() || [];

        const updatedData = chatMessages.map((item: any) => {
          if (item.id === selectedIndex) {
            return {
              ...item,
              messages: messages,
            };
          }
          return item;
        });

        setChatMessages((prevChatMessages: any) =>
          prevChatMessages.map((chatMessage: any) =>
            chatMessage.id === selectedIndex
              ? {
                  ...chatMessage,
                  messages: messages,
                }
              : chatMessage
          )
        );

        // setChatMessages(updatedData);
      }
    } catch (err) {
      console.error(
        `Error fetching messages for item ID ${selectedIndex}:`,
        err
      );
    } finally {
      setMsgLoading(false);
    }
  };

  useEffect(() => {
    const socket = new WebSocket(
      `${CONFIG?.WEBSOCKET}?Auth_Token=${userData?.access_token}`
    );

    socket.onopen = () => {
      socket.send(JSON.stringify({ action: "JOIN_CHAT" }));
    };

    socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if (data?.type === "UNREAD_CONVERSATIONS") {
        store.dispatch({
          type: "totalunreadCount",
          payload: { data: data?.data?.data?.totalUnreadConversations },
        });
      }
      if (data?.type === "UPDATE_CHAT_ROOM_LIST") {
        store.dispatch({
          type: "UPDATE_CHAT_LIST",
          payload: { data: data?.data },
        });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed.");
    };
  }, [userData?.access_token, selectedIndex]);

  useEffect(() => {
    const fetchAndTransformData = async () => {
      setLoading(true);
      setSelectedIndex(1);
      try {
        const response = await axios.get(
          `${CONFIG?.CHAT_BASE_URL}/chat/search?chatType=${
            filter === "all"
              ? "All"
              : filter === "buying"
              ? "Buyer"
              : filter === "selling"
              ? "Seller"
              : "User"
          }`,
          {
            headers: {
              Authorization: `Bearer ${userData?.access_token}`,
              "Cache-Control": "no-cache",
            },
          }
        );

        const transformedData = await transformData(response?.data?.data);
        setChatMessages(transformedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAndTransformData();
  }, [userData, filter]);

  useEffect(() => {
    const messageId = location.state;
    if (messageId && messageId !== "") {
      setChatFrom(true);
      setSelectedIndex(messageId);
    }
  }, [location]);

  useEffect(() => {
    let socket: WebSocket | null = null;

    const connectSocket = () => {
      socket = new WebSocket(
        `${CONFIG?.WEBSOCKET}?Auth_Token=${userData?.access_token}`
      );
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("WebSocket connected");

        // Join the new room
        socket?.send(
          JSON.stringify({
            action: "JOIN_ROOM",
            params: {
              roomId: selectedIndex,
            },
          })
        );
      };

      socket.onmessage = (event: any) => {
        const data = JSON.parse(event.data);
        if (data?.type === "RECIEVE_MESSAGE") {
          const receivedMessage = {
            id: data?.data?.data?._id,
            isBlocked: false,
            isReadByOthers: false,
            messageType: data?.data?.data?.message_type,
            product: data?.data?.data.product || {},
            sender: data?.data?.data?.you ? "user" : "Seller",
            senderImage: data?.data?.data.sender_image,
            text: data?.data?.data.message,
            timestamp: data?.data?.data.time
              ? getTimeAgo(data?.data?.data.time)
              : "Unknown time",
            you: data?.data?.data?.you,
          };

          setChatMessages((prevChatMessages: any) =>
            prevChatMessages.map((chatMessage: any) =>
              chatMessage.id === data?.data?.data?.roomId
                ? {
                    ...chatMessage,
                    messages: [...chatMessage.messages, receivedMessage],
                  }
                : chatMessage
            )
          );
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket disconnected");
      };
    };

    const disconnectSocket = () => {
      if (socketRef.current) {
        if (socketRef.current.readyState === WebSocket.OPEN) {
          console.log(`Leaving room ${selectedIndex}`);
          socketRef.current.send(
            JSON.stringify({
              action: "DISCONNECT_FROM_ROOM",
              params: {
                roomId: selectedIndex,
              },
            })
          );
        } else {
          console.warn(
            "WebSocket is not open, unable to send LEAVE_ROOM action."
          );
        }
        socketRef.current.close();
        socketRef.current = null;
      }
    };

    // Handle room change
    disconnectSocket();
    connectSocket();

    if (selectedIndex !== 1) fetchMessages(selectedIndex);

    return () => {
      // Clean up on component unmount or selectedIndex change
      disconnectSocket();
    };
  }, [userData?.access_token, selectedIndex]);

  useEffect(() => {
    if (UpdatedChatList && UpdatedChatList._id) {
      const updatedId = UpdatedChatList._id;
      const newMessage = UpdatedChatList?.last_message?.[0]?.message || "";
      const unReadCount = UpdatedChatList?.unread_count || "";

      setChatMessages((prevChatMessages) => {
        const updatedChatMessages = prevChatMessages.map((chatMessage) =>
          chatMessage.id === updatedId
            ? {
                ...chatMessage,
                message: newMessage,
                unreadCount: unReadCount,
                timestamp: UpdatedChatList?.last_message?.[0]?.createdAt
                  ? getTimeAgo(UpdatedChatList.last_message[0].createdAt)
                  : chatMessage.timestamp,
              }
            : chatMessage
        );

        const updatedChat = updatedChatMessages.find(
          (chatMessage) => chatMessage.id === updatedId
        );

        const unpinnedChats = updatedChatMessages.filter(
          (chatMessage: any) => chatMessage?.unpin
        );

        const remainingChats = updatedChatMessages.filter(
          (chatMessage: any) =>
            chatMessage.id !== updatedId && !chatMessage?.unpin
        );

        return updatedChat
          ? [...unpinnedChats, updatedChat, ...remainingChats]
          : [...unpinnedChats, ...remainingChats];
      });
    }
  }, [UpdatedChatList]);

  return (
    <div>
      <Header />
      <Dashboard>
        {selectedChat ? (
          <Chat
            selectedIndex={selectedIndex}
            chatFrom={chatFrom}
            setSelectedIndex={setSelectedIndex}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            setLoading={setLoading}
            loading={loading}
            filter={filter}
            setFilter={setFilter}
            msgLoading={msgLoading}
            setSelectedChat={setSelectedChat}
          />
        ) : (
          <InboxMessages
            setSelectedChat={setSelectedChat}
            setSelectedIndex={setSelectedIndex}
            setChatFrom={setChatFrom}
            messages={chatMessages}
            setChatMessages={setChatMessages}
            setLoading={setLoading}
            setFilter={setFilter}
            filter={filter}
          />
        )}
      </Dashboard>
    </div>
  );
};

export default DashboardLayout;
