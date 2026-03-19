import axios from 'axios';
import nprogress from 'nprogress';

nprogress.configure({ showSpinner: false, speed: 400 });

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});

api.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response;
  },
  (error) => {
    nprogress.done();
    return Promise.reject(error);
  }
);

export default api;
