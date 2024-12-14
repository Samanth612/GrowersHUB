import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import userData from "./userData";
import faqs from "./Faqs";
import SellersProductData from "./SellerProductData";

// Create the root reducer
const rootReducer: any = combineReducers({
  auth: AuthReducer,
  userData: userData,
  faqs: faqs,
  SellersProductData: SellersProductData,
});

export default rootReducer;
