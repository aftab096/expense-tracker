import axios from "axios";
import authHeader from "./auth-header";
import api_constants from '../tack/constants/api-constants';

const getPublicContent = () => {
  return axios.get(api_constants.BASE_PATH + "all");
};

const getUserBoard = () => {
  return axios.get(api_constants.BASE_PATH + "user", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
};
