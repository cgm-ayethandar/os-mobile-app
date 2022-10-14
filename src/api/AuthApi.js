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

  //   if (error && error.response && error.response.status) {
  //     const status = error.response.status;
  //   }

  return {
    code: error?.response?.status,
    // message: error?.response?.data?.message,
    message: error?.response?.data,
  };
};

export const fetchUserProfile = async (token) => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/profile";

    postHeader.headers.Authorization = `Bearer ${token}`;

    try {
      const response = await axiosInstance.get(subUrl, postHeader);
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};

export const actionRegister = async (
  name,
  email,
  password,
  password_confirmation
) => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/register";

    try {
      const response = await axiosInstance.post(
        subUrl,
        { name, email, password, password_confirmation },
        postHeader
      );
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};

export const actionLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/login";

    try {
      const response = await axiosInstance.post(
        subUrl,
        { email, password },
        postHeader
      );
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};

export const actionLogout = async (token) => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/logout";

    postHeader.headers.Authorization = `Bearer ${token}`;

    try {
      const response = await axiosInstance.delete(subUrl, postHeader);
      resolve(response);
    } catch (error) {
      reject(extractError(error));
    }
  });
};
