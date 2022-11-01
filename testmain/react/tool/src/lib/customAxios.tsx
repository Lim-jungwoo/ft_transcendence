import axios, { AxiosInstance } from 'axios';

export const customAxios: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});