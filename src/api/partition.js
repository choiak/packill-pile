import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';

export function getPartition(id, config= {}) {
	const query = qs.stringify(
		{
			...config
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`api/partitions/${id}?${query}`).get().json();
}