import axios from "axios";
import applyCaseMiddleware from 'axios-case-converter';
import config from "../config";

const Axios = axios.create({
  baseURL: "http://localhost:8081/https://api.yelp.com/v3",
  timeout: 30 * 1000,
});

Axios.interceptors.request.use(
  async (cfg) => {
    const { yelpApiSecret } = config;
    cfg.headers.Authorization = `Bearer ${yelpApiSecret}`;
    return cfg;
  },

  (error) => {
    return Promise.reject(error);
  }
);

const CustomAxios = applyCaseMiddleware(Axios);

export default CustomAxios;
