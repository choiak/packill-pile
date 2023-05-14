import { getProblems } from '@/api/problem.js';
import { getMe } from '@/api/me.js';
import { computed, unref, watch } from 'vue';

export function getMyNextProblem(topicId) {
	const problemsQuery = computed(() => {
		return {
			fields: ['id'], filters: {
				topic: unref(topicId),
			},
		}
	});

	const problemsResponse = getProblems(problemsQuery, { immediate: false });

	const problemsCompletedResponse = getMe({
		fields: [], populate: {
			completedProblems: {
				fields: ['id'],
			},
		},
	}, { immediate: false });

	const canAbort = computed(() => {
		return problemsResponse.canAbort.value && problemsCompletedResponse.canAbort.value;
	});

	function abort() {
		if (canAbort.value) {
			if (problemsResponse.canAbort.value) {
				problemsResponse.abort();
			}
			if (problemsCompletedResponse.canAbort.value) {
				problemsCompletedResponse.abort();
			}
		}
	}

	if (unref(topicId)) {
		abort();
		problemsResponse.execute();
		problemsCompletedResponse.execute();
	}

	watch(problemsQuery, () => {
		if (unref(topicId)) {
			abort();
			problemsResponse.execute();
			problemsCompletedResponse.execute();
		}
	});

	const isLoading = computed(() => {
		return (problemsResponse.isFetching.value || problemsCompletedResponse.isFetching.value);
	});

	const problems = computed(() => {
		return problemsResponse.data.value?.data;
	});

	const problemsCompleted = computed(() => {
		return problemsCompletedResponse.data.value?.completedProblems;
	});

	const problemsUncompleted= computed(() => {
		if (problems.value && problemsCompleted.value) {
			return problems.value.filter((problem) => !problemsCompleted.value.some((problemCompleted) => problemCompleted.id === problem.id));
		} else {
			return null;
		}
	});

	const nextProblemId = computed(() => {
		if (problemsUncompleted.value) {
			if (problemsUncompleted.value.length) {
				return problemsUncompleted.value[0].id;
			} else {
				return 0;
			}
		} else {
			return null;
		}
	});

	return { id: nextProblemId, isLoading, canAbort, abort };
}
