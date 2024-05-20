import axios from "axios";
import { BASE_URL } from "../constants/constants";

axios.defaults.withCredentials = true;

export const apiLogin = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    username,
    password,
  });

  if (response.status === 200) {
    return response.data;
  }

  return response.data;
};

export const apiLogout = async () => {
  const response = await axios.get(`${BASE_URL}/users/logout`);
  return response.data;
};

export const apiCheckAuth = async () => {
  const response = await axios.get(`${BASE_URL}/users/isLoggedIn`);

  return response.data;
};

export const apiRegister = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/users/signup`, {
    username,
    password,
  });

  if (response.status === 200) {
    return response.data;
  }

  return response.data;
};
