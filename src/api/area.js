import { useFetch } from '@/utils/fetch.js';

export function listAreas() {
	return useFetch(
		`http://localhost:1337/api/areas`,
		{
			method: 'GET',
		},
		true,
	);
}