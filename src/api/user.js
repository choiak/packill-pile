import qs from 'qs';
import { useFetch } from '@/utils/fetch.js';

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

	return useFetch(
		`http://localhost:1337/api/users?${query}`,
		{
			method: 'GET',
		},
		true,
	);
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

	return useFetch(
		`http://localhost:1337/api/users/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}
