import axios from 'axios';

const API_URL: string = import.meta.env.VITE_API_URL;
const API_TOKEN: string = import.meta.env.VITE_API_TOKEN;

export const instance = axios.create({
  baseURL: API_URL,
});
instance.defaults.headers.authorization = `Bearer ${API_TOKEN}`;
