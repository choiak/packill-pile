import { getProblems } from '@/api/workspace.js';
import { getMe } from '@/api/me.js';
import { computed, ref, watch } from 'vue';

export function getMyNextProblem(topicId) {
	const nextProblem = ref();

	const problemsResponse = getProblems({
		fields: ['id'],
		filters: {
			topic: topicId,
		},
	});
	const problemsCompletedResponse = getMe({
		fields: ['completedProblems'],
		populate: {
			completedProblems: {
				fields: ['id'],
			},
		},
	});

	const isLoading = computed(() => {
		return (
			problemsResponse.loading.value ||
			problemsCompletedResponse.loading.value
		);
	});

	watch(isLoading, (newState) => {
		if (!newState) {
			const problems = problemsResponse.data.value.data;
			const problemsCompleted =
				problemsCompletedResponse.data.value.completedProblems;
			const problemsUncompleted = problems.filter(
				(problem) =>
					!problemsCompleted.some(
						(problemCompleted) =>
							problemCompleted.id === problem.id,
					),
			);
			if (problemsUncompleted[0]) {
				nextProblem.value = problemsUncompleted[0].id;
			} else {
				nextProblem.value = 0;
			}
		}
	});

	return nextProblem;
}
