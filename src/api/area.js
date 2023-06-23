import { useFetchValidated } from '@/utils/fetch.js';
import qs from 'qs';
import { computed, unref } from 'vue';

export function getAreas(query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query),
			{
				encodeValuesOnly: true,
			},
		);
	});

	const url = computed(() => {
		return `api/areas?${queryString.value}`;
	});

	return useFetchValidated(url, config).get().json();
}