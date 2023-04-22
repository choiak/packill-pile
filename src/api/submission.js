import { useFetch } from '@/utils/fetch.js';
import qs from 'qs';

export const postProblemSubmission = (problemId, answers, config = {}) => {
	const query = qs.stringify(
		{
			...config,
		},
		{
			encodeValuesOnly: true,
		},
	);

	return useFetch(
		`http://localhost:1337/api/problem-submissions?${query}`,
		{
			method: 'POST',
			data: {
				data: {
					problem: {
						connect: [problemId],
					},
					rawAnswers: answers,
				},
			},
		},
		true,
	);
};

export const getProblemSubmissions = (config = {}) => {
	const query = qs.stringify(
		{
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/problem-submissions?${query}`,
		{
			method: 'GET',
		},
		true,
	);
};

export const getProblemSubmission = (id, config = {}) => {
	const query = qs.stringify(
		{
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/problem-submissions/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
};

export const getQuestionSubmission = (id, config = {}) => {
	const query = qs.stringify(
		{
			...config,
		},
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetch(
		`http://localhost:1337/api/question-submissions/${id}?${query}`,
		{
			method: 'GET',
		},
		true,
	);
};
