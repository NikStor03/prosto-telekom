import { Env } from '@constants/env';
import axios from 'axios';

export const api = axios.create({
  baseURL: Env.BACKEND_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);
