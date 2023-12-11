import axios from 'axios';

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND;

const http = axios.create({
	baseURL: URL_BACKEND,
	timeout: 5000,
});

http.interceptors.request.use(
	(request) => {
		const token = localStorage.getItem('token');
		if (token) {
			request.headers.Authorization = `Bearer ${token}`;
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default http;
