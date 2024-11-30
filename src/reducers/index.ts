import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";

// Create the root reducer
const rootReducer: any = combineReducers({
  auth: AuthReducer,
});

export default rootReducer;
