import axios from "axios";
import { BASE_URL } from "../constants/constants";

export const apiGetTransactions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/purchase`);

    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiGetTransaction = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/purchase`);

    const transaction = response.data.data.find((t) => t.id === id);

    return transaction;
  } catch (error) {
    return error.response.data;
  }
};

export const apiCreateTransaction = async (transaction) => {
  try {
    const response = await axios.post(`${BASE_URL}/purchase`, transaction);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
