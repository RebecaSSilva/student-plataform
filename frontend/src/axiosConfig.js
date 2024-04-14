import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/student', // Set base URL
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8081', // Set an allowed origin for CORS
    'Content-Type': 'application/json'

  },
});

// Intercept requests to add the authentication token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
