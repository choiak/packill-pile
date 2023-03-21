import qs from 'qs';
import { requestWIthValidation } from '@/utils/request.js';

export async function getUser(id) {
	const query = qs.stringify(
		{
			populate: ['avatar', 'role'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		});

	return await requestWIthValidation
		.get(
			`/api/users/${id}?${query}`,
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
}