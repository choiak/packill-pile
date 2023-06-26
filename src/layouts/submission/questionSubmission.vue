<template>
	<ChoiceSubmission
		v-if="questionTypeIsChoice"
		:question="question"
		:answer="answer"
		:state="state"
	/>
	<ShortSubmission
		v-if="questionTypeIsShort"
		:question="question"
		:answer="answer"
		:state="state"
	/>
</template>

<script setup>
import { getQuestionSubmission } from '@/api/submission.js';
import { computed, onUnmounted } from 'vue';
import ChoiceSubmission from '@/layouts/submission/choiceSubmission.vue';
import ShortSubmission from '@/layouts/submission/shortSubmission.vue';

const props = defineProps({
	questionSubmissionId: Number,
});

const questionSubmissionResponse = getQuestionSubmission(
	props.questionSubmissionId,
	{
		fields: ['id', 'state', 'rawAnswer'],
		populate: {
			question: {
				populate: {
					content: {
						populate: '*',
					},
				},
			},
		},
	},
);

const questionSubmission = computed(() => {
	return questionSubmissionResponse.data.value?.data;
});

const attributes = computed(() => {
	return questionSubmission.value?.attributes;
});

const id = computed(() => {
	return questionSubmission.value?.id;
});

const state = computed(() => {
	return attributes.value?.state;
});

const question = computed(() => {
	return attributes.value?.question?.data;
});

const questionType = computed(() => {
	if (question.value?.attributes?.content[0]) {
		return question.value?.attributes?.content[0].__component;
	}
});

const questionTypeIsChoice = computed(() => {
	return questionType.value === 'question.multiple-choice';
});

const questionTypeIsShort = computed(() => {
	return questionType.value === 'question.short-question';
});

const answer = computed(() => {
	return attributes.value?.rawAnswer?.value;
});

onUnmounted(() => {
	if (questionSubmissionResponse.canAbort.value) {
		questionSubmissionResponse.abort();
	}
});
</script>
