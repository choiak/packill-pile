<template>
	<transition name="fade" mode="out-in">
		<div
			v-if="isLoading"
			class="h-[200px] w-full animate-pulse rounded-lg border bg-slate-50"
		/>
		<div v-else>
			<div v-for="item in content">
				<Choice
					v-if="item.__component === 'question.multiple-choice'"
					:question="item"
					@model="sendParent"
				/>
				<Short
					v-if="item.__component === 'question.short-question'"
					:question="item"
					@model="sendParent"
				/>
			</div>
		</div>
	</transition>
</template>

<script setup>
import { computed, watch } from 'vue';
import { getQuestion } from '@/api/question.js';
import Choice from '@/layouts/question/choice.vue';
import Short from '@/layouts/question/short.vue';

const emit = defineEmits(['model']);
const props = defineProps({
	questionId: Number,
	isCompleted: Boolean,
});

const propQuestionId = computed(() => {
	return props.questionId;
});

const questionResponse = getQuestion(
	propQuestionId,
	{
		populate: {
			content: {
				populate: '*',
			},
		},
	},
	{ immediate: false },
);

if (propQuestionId.value) {
	questionResponse.execute();
}

watch(propQuestionId, (newQuestionId) => {
	if (newQuestionId) {
		questionResponse.execute();
	}
});

const isLoading = computed(() => {
	return (
		questionResponse.isFetching.value ||
		(!questionResponse.isFetching.value &&
			!questionResponse.isFinished.value) ||
		!propQuestionId.value
	);
});

const question = computed(() => {
	return questionResponse.data.value?.data?.attributes;
});

const content = computed(() => {
	return question.value?.content;
});

function sendParent(value) {
	emit('model', value);
}
</script>
