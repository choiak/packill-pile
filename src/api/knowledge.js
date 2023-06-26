import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { computed, unref } from 'vue';

export function getKnowledge(id, query = {}, config = {}) {
	const queryString = qs.stringify(query, {
		encodeValuesOnly: true, // prettify URL
	});

	const url = computed(() => {
		return `api/knowledges/${unref(id)}?${queryString}`;
	});

	return useFetchValidated(url, config).get().json();
}
