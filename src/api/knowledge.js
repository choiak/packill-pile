import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';

export function getKnowledge(id, config) {
	const query = qs.stringify(
		{
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`api/knowledges/${id}?${query}`).get().json();
}