import axios from "axios";

const baseUrl = process.env.TWELVE_DATA_BASE_URL;
const apiKey = process.env.TWELVE_DATA_API_KEY;

const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    if (apiKey) {
      config.params = {
        ...config.params,
        apikey: apiKey,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
