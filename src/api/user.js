import qs from 'qs';
import { useFetchValidated } from '@/utils/fetch.js';

export function getUser(username, config = {}) {
	const query = qs.stringify(
		{
			filters: {
				username: {
					$eq: username,
				},
			},
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`api/users?${query}`).get().json();
}

export function getUserAvatar(id) {
	const query = qs.stringify(
		{
			populate: ['avatar'],
			fields: [''],
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`api/users/${id}?${query}`).get().json();
}
