import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';
import { computed, unref } from 'vue';

export function getAnnouncements(query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query),
			{ encodeValuesOnly: true });
	});

	const url = computed(() => {
		return `api/announcements?${queryString.value}`
	});

	return useFetchValidated(url, config).get().json();
}

export function getAnnouncement(id, query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query), { encodeValuesOnly: true });
	});

	const url = computed(() => {
		return `api/announcements/${unref(id)}?${queryString.value}`;
	});

	return useFetchValidated(url, config).get().json();
}