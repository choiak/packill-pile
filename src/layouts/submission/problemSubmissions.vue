<template>
	<div class="space-y-8">
		<ProblemSubmission
			v-for="problemSubmission in problemSubmissions"
			:problem-submission-id="problemSubmission.id"
		/>
	</div>
</template>

<script setup>
import { getProblemSubmissions } from '@/api/submission.js';
import { computed, ref, watch } from 'vue';
import ProblemSubmission from '@/layouts/submission/problemSubmission.vue';

const props = defineProps({
	problemId: Number,
});

const problemSubmissionsResponse = ref();

watch(props, (newProps) => {
	if (newProps.problemId) {
		problemSubmissionsResponse.value = getProblemSubmissions({
			sort: ['id:desc'],
			filters: {
				problem: props.problemId,
			},
		});
	} else if (newProps.problemId === null) {
		problemSubmissionsResponse.value = null;
	}
});

if (props.problemId) {
	problemSubmissionsResponse.value = getProblemSubmissions({
		fields: ['id'],
		sort: ['id:desc'],
		filters: {
			problem: props.problemId,
		},
		pagination: {
			page: 1,
			pageSize: 10,
		},
	});
}

const problemSubmissions = computed(() => {
	return problemSubmissionsResponse.value?.data?.data;
});
</script>
