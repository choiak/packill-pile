import { useFetchValidated } from '@/utils/fetch.js';
import qs from 'qs';

export function getAreas(config = {}) {
	const query = qs.stringify({ ...config },
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`api/areas?${query}`).get().json();
}