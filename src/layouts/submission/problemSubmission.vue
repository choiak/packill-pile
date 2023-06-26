<template>
	<div
		class="break-inside-avoid space-y-8 rounded-lg border bg-slate-50 px-6 py-4"
		:class="{
			'border-blue-300': stateIsAC,
			'border-yellow-400 bg-stripes bg-stripes-yellow-100': stateIsWA,
		}"
	>
		<div class="flex items-center justify-between">
			<CheckIcon class="h-4 w-4 text-blue-600" v-if="stateIsAC" />
			<XMarkIcon class="h-4 w-4 text-yellow-600" v-else-if="stateIsWA" />
			<div
				class="w-fit rounded border px-1 text-xs font-medium"
				:class="{
					'border-blue-600 text-blue-600': stateIsAC,
					'border-yellow-600 text-yellow-600': stateIsWA,
				}"
			>
				{{ state }}
			</div>
		</div>
		<div v-if="questionSubmissions" class="space-y-2">
			<QuestionSubmission
				v-for="questionSubmission in questionSubmissions"
				:question-submission-id="questionSubmission.id"
				:key="questionSubmission.id"
			/>
		</div>
		<div class="flex justify-between">
			<p class="text-xs font-medium text-neutral-500">
				{{ publishDateTime }}
			</p>
			<p class="text-xs font-medium text-neutral-500">
				Problem Submission ID: {{ id }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline/index.js';
import { getProblemSubmission } from '@/api/submission.js';
import { computed, onUnmounted } from 'vue';
import QuestionSubmission from '@/layouts/submission/questionSubmission.vue';

const props = defineProps({
	problemSubmissionId: Number,
});

const problemSubmissionResponse = getProblemSubmission(
	props.problemSubmissionId,
	{
		fields: ['id', 'state', 'createdAt'],
		populate: {
			questionSubmissions: {
				fields: ['id'],
				sort: ['question.id:asc'],
			},
		},
	},
);

const problemSubmission = computed(() => {
	return problemSubmissionResponse.data.value?.data;
});

const id = computed(() => {
	return problemSubmission.value?.id;
});

const attributes = computed(() => {
	return problemSubmission.value?.attributes;
});

const state = computed(() => {
	return attributes.value?.state;
});

const stateIsAC = computed(() => {
	return state.value === 'AC';
});

const stateIsWA = computed(() => {
	return state.value === 'WA';
});

const publishDateTime = computed(() => {
	return new Date(
		problemSubmission.value?.attributes?.createdAt,
	).toLocaleString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	});
});

const questionSubmissions = computed(() => {
	return attributes.value?.questionSubmissions?.data;
});

onUnmounted(() => {
	if (problemSubmissionResponse.canAbort.value) {
		problemSubmissionResponse.abort();
	}
});
</script>
