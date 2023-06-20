import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { useMyStore } from '@/store/me.js';

export function getMe(query = {}, config = {}) {
	const queryString = qs.stringify(query, {
		encodeValuesOnly: true,
	});

	return useFetchValidated(`api/users/me?${queryString}`, config).get().json();
}

export function updateMe(content, query = {}, config = {}) {
	const userStore = useMyStore();
	const queryString = qs.stringify(query, {
		encodeValuesOnly: true, // prettify URL
	});

	return useFetchValidated(`api/users/${userStore.id}?${queryString}`, config).put({
		...content,
	}).json();
}

export function updateMyPassword(currentPassword, newPassword, confirmationPassword, config = {}) {
	return useFetchValidated('api/auth/change-password?', config).post({
		currentPassword: currentPassword, password: newPassword, passwordConfirmation: confirmationPassword,
	}).json();
}

export function updateMyPackage(id, query = {}, config = {}) {
	const userStore = useMyStore();
	const queryString = qs.stringify(query, {
		encodeValuesOnly: true,
	});

	return useFetchValidated(`api/users/${userStore.id}?${queryString}`, config).put({
		currentPackage: {
			set: [id],
		},
	}).json();
}