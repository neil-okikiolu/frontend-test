import axios from "axios";
import config from "../config";

const Axios = axios.create({
  baseURL: "https://api.yelp.com/v3",
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  async (cfg) => {
    const {yelpApiSecret} = config;
    cfg.headers.Authorization = `Bearer ${yelpApiSecret}`;
    return cfg;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
