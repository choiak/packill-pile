import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { useUserStore } from '@/store/index.js';

export function getMe(query = {}, config = {}) {
	const queryString = qs.stringify(query, {
		encodeValuesOnly: true,
	});

	return useFetchValidated(`api/users/me?${queryString}`, config).get().json();
}

export function updateMe(content, query = {}, config = {}) {
	const userStore = useUserStore();
	const queryString = qs.stringify(query, {
		encodeValuesOnly: true, // prettify URL
	});

	return useFetchValidated(`api/users/${userStore.user.id}?${queryString}`, config).put({
		...content,
	}).json();
}

export function updateMyPassword(currentPassword, newPassword, confirmationPassword, config = {}) {
	return useFetchValidated('api/auth/change-password?', config).post({
		currentPassword: currentPassword, password: newPassword, passwordConfirmation: confirmationPassword,
	}).json();
}

// export function deleteMe(password, config = {}) {
// 	const userStore = useUserStore();
// 	const query = qs.stringify({
// 		...config,
// 	}, {
// 		encodeValuesOnly: true, // prettify URL
// 	});
//
// 	return useFetch(
// 		`http://localhost:1337/api/users/${userStore.user.id}?${query}`,
// 		{
// 			method: 'DELETE',
// 			data: {
// 				validationPassword: password,
// 			},
// 		},
// 		true,
// 	);
// }

export function updateMyPackage(id, query = {}, config = {}) {
	const userStore = useUserStore();
	const queryString = qs.stringify(query, {
		encodeValuesOnly: true,
	});

	return useFetchValidated(`api/users/${userStore.user.id}?${queryString}`, config).put({
		validationPassword: 'TODO', currentPackage: {
			set: [id],
		},
	}).json();
}