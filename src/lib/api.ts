import axios from 'axios';

export const BASE_URL = 'https://expense-tracker-node-production.up.railway.app/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default api;