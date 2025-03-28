import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://159.223.35.227:8080/api',
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        // Add any auth tokens if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
