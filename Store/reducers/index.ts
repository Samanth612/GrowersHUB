import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import userData from "./userData";
import faqs from "./Faqs";
import SellersProductData from "./SellerProductData";
import UserAlbum from "./UserAlbums";

const rootReducer: any = combineReducers({
  auth: AuthReducer,
  userData: userData,
  faqs: faqs,
  SellersProductData: SellersProductData,
  userAlbum: UserAlbum,
});

export default rootReducer;
