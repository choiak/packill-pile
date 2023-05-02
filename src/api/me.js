import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { useUserStore } from '@/store/index.js';

export function getMyProgress(config = {}) {
	const query = qs.stringify({
		fields: ['currentPackage', 'currentPartition', 'currentTopic'],
		populate: {
			currentTopic: true,
			currentPackage: true,
			currentPartition: {
				populate: {
					topics: true,
				},
			},
		},
		...config,
	});

	return useFetchValidated(`http://localhost:1337/api/users/me?${query}`).get().json();
}

export function getMe(config = {}) {
	const query = qs.stringify({
		...config,
	});

	return useFetchValidated(`http://localhost:1337/api/users/me?${query}`).get().json();
}

export function updateMe(content, config = {}) {
	const userStore = useUserStore();
	const query = qs.stringify({
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		});

	return useFetchValidated(`http://localhost:1337/api/users/${userStore.user.id}?${query}`).put({
		...content,
	}).json();
}

export function updateMyPassword(currentPassword, newPassword, confirmationPassword, config = {}) {
	const query = qs.stringify({
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		});

	return useFetchValidated(`http://localhost:1337/api/auth/change-password?${query}`).post({
		currentPassword: currentPassword,
		password: newPassword,
		passwordConfirmation: confirmationPassword,
	}).json();
}

export function deleteMe(password, config = {}) {
	const userStore = useUserStore();
	const query = qs.stringify({
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		});

	// return useFetch(
	// 	`http://localhost:1337/api/users/${userStore.user.id}?${query}`,
	// 	{
	// 		method: 'DELETE',
	// 		data: {
	// 			validationPassword: password,
	// 		},
	// 	},
	// 	true,
	// );
}

export function updateMyPackage(id, config = {}) {
	const userStore = useUserStore();
	const query = qs.stringify({
		...config,
	}, {
		encodeValuesOnly: true,
	});

	return useFetchValidated(`http://localhost:1337/api/users/${userStore.user.id}?${query}`).put({
		validationPassword: 'TODO',
		currentPackage: {
			set: [id],
		},
	}).json();
}