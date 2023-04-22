import qs from 'qs';
import { useFetch } from '@/utils/fetch.js';

export function getTopic(id, config = {}) {
	const query = qs.stringify(
		{
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/topics/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}