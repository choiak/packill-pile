import { useFetchValidated } from '@/utils/fetch.js';
import qs from 'qs';
import { computed, unref } from 'vue';

export const postProblemSubmission = (
	problemId,
	answers,
	query = {},
	config = {},
) => {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true,
		});
	});

	const url = computed(() => {
		return `api/problem-submissions?${unref(queryString)}`;
	});

	const payload = computed(() => {
		return {
			data: {
				problem: {
					connect: [unref(problemId)],
				},
				rawAnswers: unref(answers),
			},
		};
	});

	return useFetchValidated(url, config).post(payload).json();
};

export const getProblemSubmissions = (query = {}, config = {}) => {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true, // prettify URL
		});
	});

	const url = computed(() => {
		return `api/problem-submissions?${unref(queryString)}`;
	});

	return useFetchValidated(url, config).get().json();
};

export const getProblemSubmission = (id, query = {}, config = {}) => {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true, // prettify URL
		});
	});

	const url = computed(() => {
		return `api/problem-submissions/${unref(id)}?${unref(queryString)}`;
	});

	return useFetchValidated(url, config).get().json();
};

export const getQuestionSubmission = (id, query = {}, config = {}) => {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true, // prettify URL
		});
	});

	const url = computed(() => {
		return `api/question-submissions/${unref(id)}?${unref(queryString)}`;
	});

	return useFetchValidated(url, config).get().json();
};

export function postQuizSubmission(quizId, answers, query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true,
		});
	});

	const url = computed(() => {
		return `api/quiz-submissions?${unref(queryString)}`;
	});

	const payload = computed(() => {
		return {
			data: {
				quiz: {
					connect: [unref(quizId)],
				},
				rawAnswers: unref(answers),
			},
		};
	});

	return useFetchValidated(url, config).post(payload).json();
}

export function getQuizSubmissions(query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true,
		});
	});

	const url = computed(() => {
		return `api/quiz-submissions/?${unref(queryString)}`;
	});

	return useFetchValidated(url, config).get().json();
}

export function getQuizSubmission(id, query = {}, config = {}) {
	const queryString = computed(() => {
		return qs.stringify(unref(query), {
			encodeValuesOnly: true,
		});
	});

	const url = computed(() => {
		return `api/quiz-submissions/${unref(id)}?${unref(queryString)}`;
	});

	return useFetchValidated(url, config).get().json();
}
