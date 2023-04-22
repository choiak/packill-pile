import qs from 'qs';
import { useFetch } from '@/utils/fetch.js';
import { requestWIthValidation } from '@/utils/request.js';

export function getPackage(id) {
	const query = qs.stringify(
		{
			populate: ['areas'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/packages/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}

export function listPackages() {
	const query = qs.stringify(
		{
			populate: ['areas'],
			fields: ['name', 'description', 'areas', 'certificated'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/packages/?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}

export async function selectPackage(id) {
	return await requestWIthValidation
		.put(`/api/users/1`, {
			currentPackage: {
				set: [id],
			},
		})
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			console.log(err);
		});
}