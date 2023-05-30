import router from '@/router/index.js';
import { useUserStore } from '@/store/user.js';
import { useFetch, useFetchValidated } from '@/utils/fetch.js';

export async function login(identifier, password) {
	await useFetch('api/auth/local').post({
		identifier: identifier,
		password: password,
	})
		.json()
		.then((response) => {
			console.log(response);
			localStorage.setItem('token', response.data.value.jwt);
			return router.push('/dashboard');
		});
}

export async function logout() {
	localStorage.removeItem('token');
	return router.push('/login');
}

export async function register(username, displayName, email, password) {
	await useFetch('api/auth/local/register').post({
		username: username,
		displayName: displayName,
		email: email,
		password: password,
	})
		.json()
		.then((response) => {
			const userStore = useUserStore();
			localStorage.setItem('token', response.data.value.jwt);
			userStore.$patch({
				username: response.data.value.user.username,
			});
			return router.push('dashboard');
		});
}

export async function validateToken() {
	let isValid = false;
	await useFetchValidated('api/users/me')
		.get()
		.json()
		.then((response) => {
			const userStore = useUserStore();
			userStore.$patch({
				id: response.data.value.id,
				username: response.data.value.username,
				displayName: response.data.value.displayName
			});
			isValid = true;
		});
	return isValid;
}

export function getToken() {
	return localStorage.getItem('token');
}
