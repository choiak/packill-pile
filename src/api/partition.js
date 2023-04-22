import qs from 'qs';
import { useFetch } from '@/utils/fetch.js';

export function getPartition(id) {
	const query = qs.stringify(
		{
			populate: ['topics'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/partitions/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}