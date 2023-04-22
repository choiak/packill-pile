import qs from 'qs';
import { requestWIthValidation } from '@/utils/request.js';
import { useFetch } from '@/utils/fetch.js';

export function getProblem(id) {
	const query = qs.stringify(
		{
			populate: {
				content: {
					populate: {
						question: {
							fields: ['id'],
						},
					},
				},
				difficulty: true,
			},
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/problems/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}

export function getProblems(config = {}) {
	const query = qs.stringify(
		{
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/problems/?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}

export function getDifficulty(id) {
	const query = qs.stringify(
		{},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/difficulties/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}

export function getKnowledge(id) {
	const query = qs.stringify(
		{
			populate: {
				author: {
					populate: ['avatar'],
				},
				areas: true,
			},
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/knowledges/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}

export function getTopic(id) {
	const query = qs.stringify(
		{
			populate: {
				knowledges: true,
				problems: {
					fields: ['id'],
				},
			},
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/topics/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
}

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

export function getPartition(id) {
	const query = qs.stringify(
		{
			populate: ['topics'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/partitions/${id}?${query}`,
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

export function listAreas() {
	return useFetch(
		`http://localhost:1337/api/areas`,
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
