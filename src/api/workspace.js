import qs from 'qs';
import { requestWIthValidation } from '@/utils/request.js';

export async function getTopic(id) {
	const query = qs.stringify(
		{
			populate: {
				knowledges: {
					populate: {
						author: {
							populate: ['avatar'],
						},
						areas: true,
					}
				}
			}
		},
		{
			encodeValuesOnly: true, // prettify URL
		}
	)

	return await requestWIthValidation
		.get(
			`/api/topics/${id}?${query}`,
		)
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

export async function getPackage(id) {
	const query = qs.stringify(
		{
			populate: ['areas'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		}
	)

	return await requestWIthValidation
		.get(
			`/api/packages/${id}?${query}`,
		)
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

export async function listPackages() {
	const query = qs.stringify(
		{
			populate: ['areas'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		}
	)

	return await requestWIthValidation
		.get(
			`/api/packages?${query}`,
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
