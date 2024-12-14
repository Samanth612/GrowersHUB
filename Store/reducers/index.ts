import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import userData from "./userData";

// Create the root reducer
const rootReducer: any = combineReducers({
  auth: AuthReducer,
  userData: userData,
});

export default rootReducer;
