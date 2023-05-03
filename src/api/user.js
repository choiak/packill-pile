import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { computed, unref } from 'vue';

export function getUserByUsername(username, config = {}) {
	const query = qs.stringify({
		filters: {
			username: {
				$eq: username,
			},
		}, ...config,
	}, {
		encodeValuesOnly: true, // prettify URL
	});

	return useFetchValidated(`api/users?${query}`).get().json();
}

export function getUserById(id, query = {}, config = {}) {
	const queryString = qs.stringify({
		...query,
	}, {
		encodeValuesOnly: true, // prettify URL
	});

	const url = computed(() => {
		return `api/users/${unref(id)}?${queryString}`;
	});

	return useFetchValidated(url, { ...config }).get().json();
}
