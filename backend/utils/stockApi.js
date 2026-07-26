import axios from "axios";

const baseUrl = process.env.FINNHUB_BASE_URL;
const apiKey = process.env.FINNHUB_API_KEY;

const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    if (apiKey) {
      config.params = {
        ...config.params,
        token: apiKey,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
