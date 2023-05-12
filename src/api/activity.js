import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { computed, unref } from 'vue';

export function getActivities(query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query),
			{ encodeValuesOnly: true });
	});

	const url = computed(() => {
		return `api/activities?${queryString.value}`
	});

	return useFetchValidated(url, config).get().json();
}

export function getActivity(id, query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query), { encodeValuesOnly: true });
	});

	const url = computed(() => {
		return `api/activities/${unref(id)}?${queryString.value}`;
	});

	return useFetchValidated(url, config).get().json();
}