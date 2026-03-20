import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';
import nprogress from 'nprogress';
import toast from 'react-hot-toast';

nprogress.configure({ showSpinner: false, speed: 400 });

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  nprogress.start();
  return config;
});

api.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const user = useAuthStore.getState().user;
      const refreshToken = user?.refreshToken;

      if (refreshToken) {
        try {
          const data = await AuthService.refreshToken(refreshToken);

          useAuthStore.getState().setAuth({
            ...user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        }
      }
    }

    const errorMsg = error?.response?.data?.message || error.message;
    toast.error(`ApiError: \n ${errorMsg}`);
    nprogress.done();
    return Promise.reject(error);
  }
);

export default api;
