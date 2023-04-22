import qs from 'qs';
import { useFetch } from '@/utils/fetch.js';

export function getMyProgress(config = {}) {
	const query = qs.stringify({
		fields: ['currentPackage', 'currentPartition', 'currentTopic'],
		populate: {
			currentTopic: true,
			currentPackage: true,
			currentPartition: {
				populate: {
					topics: true,
				},
			},
		},
		...config,
	});

	return useFetch(
		`http://localhost:1337/api/users/me?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}

export function getMe(config = {}) {
	const query = qs.stringify({
		...config,
	});

	return useFetch(
		`http://localhost:1337/api/users/me?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}
