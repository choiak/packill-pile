<template>
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
</template>

<script setup>
import { computed, inject, onUnmounted, ref, watch } from 'vue';
import { getQuestion } from '@/api/question.js';
import Choice from '@/layouts/question/choice.vue';
import Short from '@/layouts/question/short.vue';

const emit = defineEmits(['model']);
const props = defineProps({
	questionId: Number,
});

const questionResponse = ref();

watch(props, (newProps) => {
	if (newProps.questionId) {
		questionResponse.value = getQuestion(props.questionId, {
			populate: {
				content: {
					populate: '*',
				},
			},
		});
	} else if (newProps.questionId === null) {
		questionResponse.value = null;
	}
});

if (props.questionId) {
	questionResponse.value = getQuestion(props.questionId, {
		populate: {
			content: {
				populate: '*',
			},
		},
	});
}

const attributes = computed(() => {
	return questionResponse.value?.data?.data?.attributes;
});

const content = computed(() => {
	return attributes.value?.content;
});

function sendParent(value) {
	emit('model', value);
}
</script>
