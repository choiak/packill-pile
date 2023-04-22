<template>
	<form class="space-y-8" @keydown.enter.prevent="handleSubmit">
		<div class="flex items-center justify-between">
			<div>
				<h5 class="font-semibold">{{ attributes?.name }}</h5>
				<div class="flex space-x-2">
					<p class="text-sm text-neutral-500">
						Published on
						<span class="font-medium">
							{{ publishedAtString }}
						</span>
					</p>
					<p class="text-sm text-neutral-500">•</p>
					<p class="text-sm text-neutral-500">
						Updated on
						<span class="font-medium">
							{{ updatedAtString }}
						</span>
					</p>
				</div>
			</div>
			<DifficultyIndicator :difficulty-id="difficultyId" show-name />
		</div>
		<div v-for="item in content" :key="`${item.__component}-${item.id}`">
			<p
				v-if="item.__component === 'generic.rich-text'"
				class="prose-article text-justify font-text"
				v-html="item.text"
			/>
			<Question
				v-if="item.__component === 'relation.question-connector'"
				:questionId="item.question.data.id"
				@model="getAnswer(item.question.data.id, $event)"
			/>
		</div>
		<div class="flex items-center justify-between">
			<div></div>
			<button
				type="submit"
				@click.prevent="handleSubmit"
				class="btn-accent flex items-center space-x-1"
				:disabled="!isCompleted || isWaitingResult"
			>
				<span>Submit</span>
				<ChevronDoubleRightIcon class="h-4 w-4" />
			</button>
		</div>
	</form>
</template>

<script setup>
import DifficultyIndicator from '@/components/pile/problem/difficultyIndicator.vue';
import Choice from '@/layouts/question/choice.vue';
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/outline/index.js';
import Short from '@/layouts/question/short.vue';
import { computed, provide, ref, watch } from 'vue';
import { getProblem } from '@/api/workspace.js';
import {
	getProblemSubmission,
	postProblemSubmission,
} from '@/api/submission.js';
import Question from '@/layouts/question/question.vue';

const props = defineProps({
	problemId: Number,
});

const problemResponse = ref();

watch(props, (newProps) => {
	if (newProps.problemId) {
		problemResponse.value = getProblem(props.problemId);
	} else if (newProps.problemId === null) {
		problemResponse.value = null;
	}
});

if (props.problemId) {
	problemResponse.value = getProblem(props.problemId);
}

// if there are new refs , the inner ref is destructed
const attributes = computed(() => {
	return problemResponse.value?.data?.data?.attributes;
});

const content = computed(() => {
	return attributes.value?.content;
});

const difficultyId = computed(() => {
	return attributes.value?.difficulty.data.id;
});

const publishedAtString = computed(() => {
	return new Date(attributes.value?.publishedAt).toLocaleString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
});

const updatedAtString = computed(() => {
	return new Date(attributes.value?.updatedAt).toLocaleString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
});

const answers = ref([]);

function getAnswer(id, answer) {
	const answerIndex = answers.value.findIndex((answer) => answer?.id === id);
	if (answerIndex !== -1) {
		if (answer.length) {
			answers.value[answerIndex] = {
				id: id,
				value: answer,
			};
		} else {
			answers.value = answers.value.filter((answer) => answer?.id !== id);
		}
	} else {
		if (answer.length) {
			answers.value.push({
				id: id,
				value: answer,
			});
		}
	}
}

const isCompleted = computed(() => {
	return (
		answers.value.length ===
		content.value?.filter(
			(item) => item.__component === 'relation.question-connector',
		).length
	);
});

const previousProblemSubmissionIdResponse = ref(null);
const previousProblemSubmissionId = computed(() => {
	return previousProblemSubmissionIdResponse.value?.data?.data?.id;
});

const previousProblemSubmissionResponse = ref(null);
const previousProblemSubmission = computed(() => {
	return previousProblemSubmissionResponse.value?.data?.data;
});

const isWaitingResult = computed(() => {
	return (
		previousProblemSubmission.value?.attributes?.state === 'NA' ||
		(previousProblemSubmissionResponse.value &&
			previousProblemSubmission.value === undefined) ||
		previousProblemSubmissionIdResponse.value === undefined
	);
});

provide('isWaitingResult', isWaitingResult);

function handleSubmit() {
	if (isCompleted) {
		previousProblemSubmissionIdResponse.value = undefined;
		previousProblemSubmissionIdResponse.value = postProblemSubmission(
			props.problemId,
			answers.value,
			{
				fields: ['id'],
			},
		);
	}
}

watch(previousProblemSubmissionId, (newId) => {
	if (newId) {
		previousProblemSubmissionResponse.value = getProblemSubmission(
			previousProblemSubmissionId.value,
		);
	}
});

watch(previousProblemSubmission, (newSubmission) => {
	console.log(newSubmission);
	if (
		newSubmission &&
		newSubmission?.attributes?.state === 'NA' &&
		previousProblemSubmissionId.value
	) {
		setTimeout(() => {
			previousProblemSubmissionResponse.value = getProblemSubmission(
				previousProblemSubmissionId.value,
			);
		}, 1 * 1000);
	}
});
</script>
