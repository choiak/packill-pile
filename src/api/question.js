import { useFetch } from '@/utils/fetch.js';
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

	return useFetch(
		`http://localhost:1337/api/questions/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}
