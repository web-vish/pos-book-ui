import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: axios.defaults.baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}); 