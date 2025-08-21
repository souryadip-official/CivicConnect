// src/api.js

import axios from 'axios';

// This creates a new instance of axios
const apiClient = axios.create({
  // This is the key part:
  // In production (on Render), it will use the URL you provide.
  // In local development, it will use the proxy in your package.json.
  baseURL: process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_BACKEND_URL 
    : '/',
});

export default apiClient;