import qs from 'qs';
import { useFetch } from '@/utils/fetch.js';

export function getDifficulty(id) {
	const query = qs.stringify(
		{},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/difficulties/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}