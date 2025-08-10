/**
 * This file ensures that any requests made to the backend gets intercepted and ensures that the access token is included in the headers.
 */

import axios from 'axios';
import { ACCESS_TOKEN_ID } from './constants';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? '/choreo-apis/react-django-project/backend/v1',
});

api.interceptors.request.use(
    (config) => { 
        const accessToken = localStorage.getItem(ACCESS_TOKEN_ID);
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;