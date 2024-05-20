import axios from "axios";
import { BASE_URL } from "../constants/constants";

axios.defaults.withCredentials = true;

export const apiGetSummary = async () => {
  try {
    const users = await axios.get(`${BASE_URL}/admin/users`);
    const medicines = await axios.get(`${BASE_URL}/admin/medicine`);

    return {
      users: users.data.data.length,
      medicines: medicines.data.data.length,
    };
  } catch (error) {
    return error.response.data;
  }
};

export const apiGetUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/users`);

    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiGetMedicines = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/medicine`);

    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiCreateMedicine = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/medicine`, data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiDeleteMedicine = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/medicine/${id}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiGetTransactions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/purchases`);

    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};
