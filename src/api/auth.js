import router from '@/router/index.js';
import { useUserStore } from '@/store/index.js';
import { request, requestWIthValidation } from '@/utils/request.js';

export async function login(identifier, password) {
	await request
		.post('/api/auth/local', {
			identifier: identifier,
			password: password,
		})
		.then((res) => {
			localStorage.setItem('token', res.data.jwt);
			return router.push('/dashboard');
		})
		.catch((err) => {
			console.log(err);
		});
}

export async function logout() {
	localStorage.removeItem('token');
	return router.push('/login');
}

export async function register(username, email, password) {
	await request
		.post('/api/auth/local/register', {
			username: username,
			email: email,
			password: password,
		})
		.then((res) => {
			const userStore = useUserStore();
			localStorage.setItem('token', res.data.jwt);
			userStore.user.name = res.data.user.username;
			return router.push('dashboard');
		})
		.catch((err) => {
			console.log(err);
		});
}

export async function validate() {
	let isValid = false;
	await requestWIthValidation
		.get('/api/users/me')
		.then((res) => {
			const userStore = useUserStore();
			userStore.user.id = res.data.id;
			userStore.user.username = res.data.username;
			userStore.user.displayName = res.data.displayName;
			return (isValid = true);
		})
		.catch((err) => {
			console.log(err);
		});
	return isValid;
}

export function getToken() {
	return localStorage.getItem('token');
}
