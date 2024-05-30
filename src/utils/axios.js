import axios from "axios";
import router from "../router";
const baseURL = import.meta.env.VITE_BASE_URL;
const http = axios.create({
  baseURL: baseURL,
  timeout: 60000,
});

http.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = localStorage.getItem("yallavebtoken")
      ? "Bearer " + localStorage.getItem("yallavebtoken")
      : "";
    config.headers["Content-Type"] = "application/json";
    config.headers["brand-id"] = 2;
    config.headers["lang"] = "uz";
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

    if (response && response.status === 401) {
      router.push("/login");
      localStorage.removeItem("yallavebtoken");
      localStorage.removeItem("yallavebphone");
      localStorage.removeItem("yallavebkey");
      localStorage.removeItem("yallavebcode");
    }

    return Promise.reject(response);
  }
);

export default http;
