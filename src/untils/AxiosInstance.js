import axios from 'axios';

const AxiosInstance = (contentType = 'application/json') => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true // 👈 Gửi cookie theo mỗi request
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      config.headers = {
        'Accept': 'application/json',
        'Content-Type': contentType
      };
      return config;
    },
    err => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    res => res,
    err => Promise.reject(err)
  );

  return axiosInstance;
};

export default AxiosInstance;
