import { requestWIthValidation } from '@/utils/request.js';

export async function getTopic(id) {
	return await requestWIthValidation
		.get(
			`/api/topics/${id}?populate[knowledges][populate][author][populate]=avatar&populate[knowledges][populate]=areas`,
		)
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

export async function listPackages() {
	return await requestWIthValidation
		.get(
			`/api/packages?populate=areas`,
		)
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

export async function listAreas() {
	return await requestWIthValidation
		.get(
			`/api/areas/`,
		)
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			console.log(err);
		});
}
