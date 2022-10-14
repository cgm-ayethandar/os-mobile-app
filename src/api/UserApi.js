import { Constants } from "../constant/Constants";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: Constants.api_url });

const postHeader = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const extractError = (raw) => {
  const error = { ...raw };

  return {
    code: error?.response?.status,
    // message: error?.response?.data?.message,
    message: error?.response?.data,
  };
};

export const fetchProfile = async (id) => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/profile/" + id;

    try {
      const response = await axiosInstance.get(subUrl, postHeader);
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};
