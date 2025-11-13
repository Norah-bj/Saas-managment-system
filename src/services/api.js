import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// Organization API
export const organizationAPI = {
  getAll: () => api.get('/organization'),
  getById: (id) => api.get(`/organization/${id}`),
  create: (data) => api.post('/organization', data),
  update: (id, data) => api.put(`/organization/${id}`, data),
  delete: (id) => api.delete(`/organization/${id}`),
};

// CHW API
export const chwAPI = {
  getAll: () => api.get('/chw'),
  getById: (id) => api.get(`/chw/${id}`),
  create: (data) => api.post('/chw', data),
  update: (id, data) => api.put(`/chw/${id}`, data),
  delete: (id) => api.delete(`/chw/${id}`),
};

export default api;
