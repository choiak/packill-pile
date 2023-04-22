import qs from 'qs';
import { useFetch } from '@/utils/fetch.js';

export function getKnowledge(id) {
	const query = qs.stringify(
		{
			populate: {
				author: {
					populate: ['avatar'],
				},
				areas: true,
			},
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/knowledges/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}