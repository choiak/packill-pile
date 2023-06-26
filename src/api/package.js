import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { computed, unref } from 'vue';

export function getPackage(id, query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true, // prettify URL
		});
	});

	const url = computed(() => {
		return `api/packages/${unref(id)}?${unref(queryString)}`;
	});

	return useFetchValidated(url, config).get().json();
}

export function getPackages(query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true, // prettify URL
		});
	});

	const url = computed(() => {
		return `api/packages/?${unref(queryString)}`;
	});

	return useFetchValidated(url, config).get().json();
}
