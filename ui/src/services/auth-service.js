import axios from "axios";

import api_constants from '../constants/api-constants';

const register = (registerData) => {
  return axios.post(api_constants.BASE_PATH + api_constants.REGISTER_USER, registerData);
};

const login = async (username, password) => {
  const response = await axios
    .post(api_constants.BASE_PATH + api_constants.SIGN_IN, {
      username,
      password
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
