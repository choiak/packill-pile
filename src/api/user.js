import { requestWIthValidation } from '@/utils/request.js';

export async function getUser(id) {
	return await requestWIthValidation
		.get(
			`/api/users/${id}?populate=avatar&populate=role`,
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
}