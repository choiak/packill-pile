import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';

export function getDifficulty(id, config = {}) {
	const query = qs.stringify(
		{...config},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`http://localhost:1337/api/difficulties/${id}?${query}`).get().json();
}