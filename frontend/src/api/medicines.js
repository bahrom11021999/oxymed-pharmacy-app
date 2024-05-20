import axios from "axios";
import { BASE_URL } from "../constants/constants";

axios.defaults.withCredentials = true;

export const apiGetMedicines = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/medicine`);

    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiGetMedicine = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/medicine`);

    const medicine = response.data.data.find((m) => m.id === id);

    return medicine;
  } catch (error) {
    return error.response.data;
  }
};
