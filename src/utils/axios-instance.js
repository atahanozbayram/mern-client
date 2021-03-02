import axios from 'axios';

const backend_url = process.env.BACKEND_HOST || 'http://localhost:3000';

const axiosInstance = axios.create({
	baseURL: `${backend_url}/api`,
	withCredentials: true,
});

export { axiosInstance };
