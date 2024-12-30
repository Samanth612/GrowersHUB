import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import userData from "./userData";
import faqs from "./Faqs";
import SellersProductData from "./SellerProductData";
import UserAlbum from "./UserAlbums";
import unreadCount from "./unreadCount";
import chatRoomId from "./chatRoomId";
import UpdatedChatList from "./UpdatedChatList";
import LatestNotificationData from "./LatestNotificationData";
import AlbumCount from "./AlbumCount";
import weatherDetails from "./weatherDetails";
import ShareId from "./ShareId";

const rootReducer: any = combineReducers({
  auth: AuthReducer,
  userData: userData,
  faqs: faqs,
  SellersProductData: SellersProductData,
  userAlbum: UserAlbum,
  unreadCount: unreadCount,
  chatRoomId: chatRoomId,
  UpdatedChatList: UpdatedChatList,
  LatestNotificationData: LatestNotificationData,
  AlbumCount: AlbumCount,
  weatherDetails: weatherDetails,
  ShareId: ShareId,
});

export default rootReducer;
