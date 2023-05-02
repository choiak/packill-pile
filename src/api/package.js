import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';

export function getPackage(id, config = {}) {
	const query = qs.stringify(
		{
			populate: ['areas'],
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`api/packages/${id}?${query}`).get().json();
}

export function getPackages(config = {}) {
	const query = qs.stringify(
		{
			populate: ['areas'],
			fields: ['name', 'description', 'areas', 'certificated'],
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`api/packages/?${query}`).get().json();
}
