import router from '@/router/index.js';
import { useFetch, useFetchValidated } from '@/utils/fetch.js';
import qs from 'qs';
import { useMyStore } from '@/store/me.js';
import { storeToRefs } from 'pinia';

export async function login(identifier, password) {
	await useFetch('api/auth/local').post({
		identifier: identifier, password: password,
	})
		.json()
		.then((res) => {
			const myStore = useMyStore();
			const { setToken } = myStore;
			const { jwt } = res.data.value;
			setToken(jwt);
			router.push('/dashboard');
		});
}

export async function logout() {
	const myStore = useMyStore();
	const { clearToken } = myStore;
	clearToken();
	return router.push('/login');
}

export async function register(username, displayName, email, password) {
	await useFetch('api/auth/local/register').post({
		username: username, displayName: displayName, email: email, password: password,
	})
		.json()
		.then((res) => {
			const myStore = useMyStore();
			const { setToken } = myStore;
			const { jwt } = res.data.value;
			setToken(jwt);
			router.push('dashboard');
		});
}

export async function validateToken() {
	const myStore = useMyStore();
	const { token } = storeToRefs(myStore);

	let isValid = false;

	if (token.value && token.value.length) {
		const query = qs.stringify({
			fields: ['id'],
		}, {
			encodeValuesOnly: true, // prettify URL
		});

		await useFetchValidated(`api/users/me?${query}`)
			.get()
			.json()
			.then((res) => {
				const { status } = res.response.value;

				if (status === 200) {
					isValid = true;
				}
			});
	}

	return isValid;
}
