import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { computed, unref } from 'vue';

export function getTopic(id, query = {}, config = {}) {
	const queryString = qs.stringify(query, {
		encodeValuesOnly: true, // prettify URL
	});

	const url = computed(() => {
		return `api/topics/${unref(id)}?${queryString}`;
	});

	return useFetchValidated(url, config).get().json();
}
