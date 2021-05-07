import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import home from "./home";

export default combineReducers({
  auth,
  message,
  home,
});