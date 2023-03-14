import axios from 'axios';
import { getToken } from '@/api/auth.js';

const request = axios.create({
	baseURL: 'http://192.168.1.22:1337',
	timeout: 5000,
});

request.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		console.log(error); // for debug
		return Promise.reject(error);
	},
);

request.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	},
);

const requestWIthValidation = axios.create({
	baseURL: 'http://192.168.1.22:1337',
	timeout: 5000,
});

//request interceptor
requestWIthValidation.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${getToken()}`;
		return config;
	},
	(error) => {
		console.log(error); // for debug
		return Promise.reject(error);
	},
);

requestWIthValidation.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	},
);

export { request, requestWIthValidation };
