import { useFetchValidated } from '@/utils/fetch.js';
import qs from 'qs';

export function getQuestion(id, config = {}) {
	const query = qs.stringify(
		{
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`api/questions/${id}?${query}`).get().json();
}
