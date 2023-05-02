import { useFetchValidated } from '@/utils/fetch.js';
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

	return useFetchValidated(`api/problem-submissions?${query}`).post({
		data: {
			problem: {
				connect: [problemId],
			},
			rawAnswers: answers,
		},
	}).json();
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

	return useFetchValidated(`api/problem-submissions?${query}`).get().json();
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

	return useFetchValidated(`api/problem-submissions/${id}?${query}`).get().json();
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

	return useFetchValidated(`api/question-submissions/${id}?${query}`).get().json();
};
