import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { computed, unref } from 'vue';

export function getActivities(query = {}, config = {}) {
	const queryString = qs.stringify(query,
		{ encodeValuesOnly: true },
	);

	return useFetchValidated(`api/activities?${queryString}`, config).get().json();
}

export function getActivity(id, query = {}, config = {}) {
	const queryString = qs.stringify(query,
		{ encodeValuesOnly: true },
	);

	const url = computed(() => {
		return `api/activities/${unref(id)}?${queryString}`
	});

	return useFetchValidated(url, config).get().json();
}