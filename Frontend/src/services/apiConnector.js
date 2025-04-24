import axios from "axios";

// const BASE_URL = "http://localhost:4000/api/v1"
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL, // ✅ This adds the prefix automatically
  withCredentials: true, // optional: useful if you're dealing with cookies
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
