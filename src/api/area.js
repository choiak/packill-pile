import { useFetch } from '@/utils/fetch.js';
import qs from 'qs';

export function getAreas(config = {}) {
	const query = qs.stringify({ ...config },
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/areas`,
		{
			method: 'GET',
		},
		true,
	);
}