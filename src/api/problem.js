import { useFetch } from '@/utils/fetch.js';
import qs from 'qs';

export function getProblem(id) {
	const query = qs.stringify(
		{
			populate: {
				content: {
					populate: {
						question: {
							fields: ['id'],
						},
					},
				},
				difficulty: true,
			},
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/problems/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}

export function getProblems(config = {}) {
	const query = qs.stringify(
		{
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/problems/?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}