import { getProblems } from '@/api/problem.js';
import { getMe } from '@/api/me.js';
import { computed, ref, watch } from 'vue';

export function getMyNextProblem(topicId) {
	const id = ref();

	const problemsResponse = getProblems({
		fields: ['id'], filters: {
			topic: topicId,
		},
	});
	const problemsCompletedResponse = getMe({
		fields: ['completedProblems'], populate: {
			completedProblems: {
				fields: ['id'],
			},
		},
	});

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

	const isLoading = computed(() => {
		return (problemsResponse.isFetching.value || problemsCompletedResponse.isFetching.value);
	});

	watch(isLoading, (newState) => {
		if (!newState) {
			const problems = problemsResponse.data.value.data;
			const problemsCompleted = problemsCompletedResponse.data.value.completedProblems;
			const problemsUncompleted = problems.filter((problem) => !problemsCompleted.some((problemCompleted) => problemCompleted.id === problem.id));
			if (problemsUncompleted[0]) {
				id.value = problemsUncompleted[0].id;
			} else {
				id.value = 0;
			}
		}
	});

	return { id, canAbort, abort };
}
