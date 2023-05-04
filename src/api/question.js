import { useFetchValidated } from '@/utils/fetch.js';
import qs from 'qs';
import { computed, unref } from 'vue';

export function getQuestion(id, query = {}, config = {}) {
	const queryString = qs.stringify(
		query,
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	const url = computed(() => {
		return `api/questions/${unref(id)}?${queryString}`;
	})

	return useFetchValidated(url, config).get().json();
}
