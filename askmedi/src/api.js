import axios from 'axios';

const api = axios.create({
  baseURL: 'https://django-askmedi.onrender.com',
  withCredentials: true,
});

export default api;