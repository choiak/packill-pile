import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { computed, unref } from 'vue';

export function getUserByUsername(username, query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify({
			filters: {
				username: {
					$eq: unref(username),
				},
			}, ...unref(query),
		}, {
			encodeValuesOnly: true, // prettify URL
		});
	});

	const url = computed(() => {
		return `api/users?${unref(queryString)}`;
	});

	return useFetchValidated(url, config).get().json();
}

export function getUserById(id, query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true, // prettify URL
		});
	});

	const url = computed(() => {
		return `api/users/${unref(id)}?${unref(queryString)}`;
	});

	return useFetchValidated(url, config).get().json();
}
