// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/student', // Define a base URL para todas as solicitações
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8081', // Define a origem permitida para CORS
  },
});

// Interceptar solicitações para adicionar o token de autenticação, se disponível
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
