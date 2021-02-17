import axios from 'axios';

const host = process.env.BACKEND_HOST || 'http://localhost';
const port = process.env.BACKEND_PORT || 3000;

const axiosInstance = axios.create({
	baseURL: `${host}:${port}/api`,
	withCredentials: true,
});

export { axiosInstance };
