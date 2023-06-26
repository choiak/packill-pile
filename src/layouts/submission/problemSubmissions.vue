<template>
	<div class="space-y-8">
		<ProblemSubmission
			v-for="problemSubmission in problemSubmissions"
			:key="problemSubmission.id"
			:problem-submission-id="problemSubmission.id"
		/>
	</div>
</template>

<script setup>
import { getProblemSubmissions } from '@/api/submission.js';
import { computed, onUnmounted, toRefs, watch } from 'vue';
import ProblemSubmission from '@/layouts/submission/problemSubmission.vue';

const props = defineProps({
	problemId: Number,
	previousProblemSubmission: Object,
});

const { problemId, previousProblemSubmission } = toRefs(props);

const query = computed(() => {
	return {
		sort: ['id:desc'],
		filters: {
			problem: props.problemId,
		},
	};
});

const problemSubmissionsResponse = getProblemSubmissions(
	{
		sort: ['id:desc'],
		filters: {
			problem: props.problemId,
		},
	},
	{ immediate: false },
);

if (problemId) {
	problemSubmissionsResponse.execute();
}

watch(problemId, () => {
	problemSubmissionsResponse.execute();
});

watch(previousProblemSubmission, () => {
	problemSubmissionsResponse.execute();
});

const problemSubmissions = computed(() => {
	return problemSubmissionsResponse.data.value?.data;
});

onUnmounted(() => {
	if (problemSubmissionsResponse.canAbort.value) {
		problemSubmissionsResponse.abort();
	}
});
</script>
