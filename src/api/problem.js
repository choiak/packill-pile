import { useFetchValidated } from '@/utils/fetch.js';
import qs from 'qs';

export function getProblem(id, config = {}) {
	const query = qs.stringify(
		{
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`api/problems/${id}?${query}`).get().json();
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

	return useFetchValidated(`api/problems/?${query}`).get().json();
}