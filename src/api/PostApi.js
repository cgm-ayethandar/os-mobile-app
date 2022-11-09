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

export const fetchPopularPosts = async () => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/post/popular";

    try {
      const response = await axiosInstance.get(subUrl, postHeader);
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};

export const fetchAllPosts = async (token) => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/post";

    postHeader.headers.Authorization = `Bearer ${token}`;

    try {
      const response = await axiosInstance.get(subUrl, postHeader);
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};

export const fetchPost = async (token, id) => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/post/" + id;

    postHeader.headers.Authorization = `Bearer ${token}`;

    try {
      const response = await axiosInstance.get(subUrl, postHeader);
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};

export const fetchMorePosts = async (token, nextPage) => {
  return new Promise(async (resolve, reject) => {
    postHeader.headers.Authorization = `Bearer ${token}`;

    try {
      const response = await axios.get(nextPage, postHeader);
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};

export const fetchFavoritePost = async (token) => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/post/favorite";

    postHeader.headers.Authorization = `Bearer ${token}`;

    try {
      const response = await axiosInstance.get(subUrl, postHeader);
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};

export const likePost = async (token, id) => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/post/favorite/" + id;
    postHeader.headers.Authorization = `Bearer ${token}`;

    try {
      const response = await axiosInstance.post(subUrl, {}, postHeader);
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};

export const unlikePost = async (token, id) => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/post/favorite/" + id;
    postHeader.headers.Authorization = `Bearer ${token}`;

    try {
      const response = await axiosInstance.delete(subUrl, postHeader);
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};

export const actionSearch = async (model, buildTypeId) => {
  return new Promise(async (resolve, reject) => {
    if(buildTypeId == null) {
        const subUrl = "api/search" + `?car_model=${encodeURIComponent(model)}`;
        try {
            const response = await axiosInstance.get(subUrl, postHeader);
            resolve(response.data);
          } catch (error) {
            reject(extractError(error));
          }
    }
    else {
        const subUrl = "api/search" + `?car_model=${encodeURIComponent(model)}&build_type_id=${encodeURIComponent(buildTypeId)}`;
        try {
            const response = await axiosInstance.get(subUrl, postHeader);
            resolve(response.data);
          } catch (error) {
            reject(extractError(error));
          }
    }
  });
};

export const fetchBuildTypes = async () => {
  return new Promise(async (resolve, reject) => {
    const subUrl = "api/build-types";

    try {
      const response = await axiosInstance.get(subUrl, postHeader);
      resolve(response.data);
    } catch (error) {
      reject(extractError(error));
    }
  });
};
