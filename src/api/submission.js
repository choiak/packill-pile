import { useFetchValidated } from '@/utils/fetch.js';
import qs from 'qs';
import { computed, unref } from 'vue';

export const postProblemSubmission = (problemId, answers, query = {}, config = {}) => {
	const queryString = qs.stringify(
		query,
		{
			encodeValuesOnly: true,
		},
	);

	return useFetchValidated(`api/problem-submissions?${queryString}`).post({
		data: {
			problem: {
				connect: [problemId],
			},
			rawAnswers: answers,
		},
	}, config).json();
};

export const getProblemSubmissions = (query = {}) => {
	const queryString = qs.stringify(
		query,
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	return useFetchValidated(`api/problem-submissions?${queryString}`).get().json();
};

export const getProblemSubmission = (id, query = {}, config = {}) => {
	const queryString = qs.stringify(
		query,
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	const url = computed(() => {
		return `api/problem-submissions/${unref(id)}?${queryString}`;
	});

	return useFetchValidated(url, config).get().json();
};

export const getQuestionSubmission = (id, query = {}, config = {}) => {
	const queryString = qs.stringify(
		query,
		{
			encodeValuesOnly: true, // prettify URL
		},
	);

	const url = computed(() => {
		return `api/question-submissions/${unref(id)}?${queryString}`;
	});

	return useFetchValidated(url, config).get().json();
};
