import axios from "axios";
import router from "../router";
const baseURL = import.meta.env.BASE_URL;
const http = axios.create({
  baseURL: "http://api.ildam.uz:1701/cli",
  timeout: 60000,
});

const token_prefix = localStorage.getItem("token_prefix");

http.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      (token_prefix ? token_prefix : "Bearer ") +
      (localStorage.getItem("token") ? localStorage.getItem("token") : "");
    config.headers["Content-Type"] = "application/json";
    config.headers["brand-id"] = "2";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(response);
    } else {
      return Promise.resolve(response);
    }
  },
  (error) => {
    let response = error.response;

    if (response && response.status == 401) {
      router.push("/");
    }
    return Promise.reject(response);
  }
);

export default http;
