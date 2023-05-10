import { useFetchValidated } from '@/utils/fetch.js';
import qs from 'qs';
import { computed, unref } from 'vue';

export function getProblem(id, query = {}, config = {}) {
	const queryString = qs.stringify(
		query,
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	const url = computed(() => {
		return `api/problems/${unref(id)}?${queryString}`;
	});

	return useFetchValidated(url, config).get().json();
}

export function getProblems(query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(
			unref(query),
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
	});

	const url = computed(() => {
		return `api/problems/?${queryString.value}`;
	});

	return useFetchValidated(url, config).get().json();
}