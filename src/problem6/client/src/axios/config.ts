import axios from "axios";
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "content-type": "application/json",
  },
  // paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});
// axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    return error?.response ?? Promise.reject(error);
  }
);
export default axiosClient;
