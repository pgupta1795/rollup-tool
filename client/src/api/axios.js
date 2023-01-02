import axiosLib from 'axios';
import toast from '../helper/toast';
import { getToken, setToken } from '../services/TokenService';

export const baseURL = '/api';

axiosLib.defaults.headers.post['Content-Type'] = 'application/json';

export const axios = axiosLib.create({
  baseURL,
});

const axiosPrivate = axiosLib.create({
  baseURL,
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization)
      config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const response = await axiosLib.get(`${baseURL}/refreshToken`, {
        withCredentials: true,
      });
      const newAccessToken = response.data?.accessToken;
      setToken(newAccessToken);
      prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosPrivate(prevRequest);
    }
    toast.error(`Error : Please logout & login again`);
    return Promise.reject(error);
  }
);

export default axiosPrivate;
