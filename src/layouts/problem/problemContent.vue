<template>
	<form class='space-y-8' @keydown.enter.prevent='handleSubmit'>
		<div class='flex items-center justify-between'>
			<transition name='fade' mode='out-in'>
				<div v-if='isLoading' class='space-y-1'>
					<div class='bg-slate-200 rounded w-48 h-6 animate-pulse' />
					<div class='flex space-x-2'>
						<div class='bg-slate-200 rounded w-16 h-5 animate-pulse' />
						<p class='text-sm text-slate-400 animate-pulse'>•</p>
						<div class='bg-slate-200 rounded w-16 h-5 animate-pulse' />
					</div>
				</div>
				<div v-else>
					<h5 class='font-semibold'>{{ name }}</h5>
					<div class='flex space-x-2'>
						<p class='text-sm text-neutral-500'>
							Published on
							<span class='font-medium'>
							{{ publishedAtString }}
						</span>
						</p>
						<p class='text-sm text-neutral-500'>•</p>
						<p class='text-sm text-neutral-500'>
							Updated on
							<span class='font-medium'>
							{{ updatedAtString }}
						</span>
						</p>
					</div>
				</div>
			</transition>
			<DifficultyIndicator :difficulty-id='difficultyId' show-name />
		</div>
		<div class='space-y-8'>
			<div v-for='item in content' :key='`${item.__component}-${item.id}`'>
				<p
					v-if="item.__component === 'generic.rich-text'"
					class='prose-article text-justify font-text'
					v-html='item.text'
				/>
				<Question
					v-if="item.__component === 'relation.question-connector'"
					:questionId='item.question.data.id'
					@model='getAnswer(item.question.data.id, $event)'
				/>
			</div>
			<div class='flex items-center justify-between'>
				<div></div>
				<button
					type='submit'
					@click.prevent='handleSubmit'
					class='btn-accent flex items-center space-x-1'
					:disabled='!isCompleted || isWaitingResult'
				>
					<span>Submit</span>
					<ChevronDoubleRightIcon class='h-4 w-4' />
				</button>
			</div>
		</div>
	</form>
</template>

<script setup>
import DifficultyIndicator from '@/components/pile/problem/difficultyIndicator.vue';
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/outline/index.js';
import { computed, provide, ref, watch } from 'vue';
import { getProblem } from '@/api/problem.js';
import {
	getProblemSubmission,
	postProblemSubmission,
} from '@/api/submission.js';
import Question from '@/layouts/question/question.vue';

const props = defineProps({
	problemId: Number,
});

const propProblemId = computed(() => {
	return props.problemId;
});

const problemResponse = getProblem(propProblemId, {
	populate: {
		content: {
			populate: {
				question: {
					fields: ['id'],
				},
			},
		},
		difficulty: true,
	},
}, { immediate: false });

if (propProblemId.value) {
	problemResponse.execute();
}

watch(propProblemId, (newProblemId) => {
	if (newProblemId) {
		problemResponse.execute();
	}
});

const isLoading = computed(() => {
	return problemResponse.isFetching.value || (!problemResponse.isFetching.value && !problemResponse.isFinished.value) || !propProblemId.value;
});

const problem = computed(() => {
	return problemResponse.data.value?.data?.attributes;
});

const name = computed(() => {
	return problem.value?.name;
});

const content = computed(() => {
	return problem.value?.content;
});

const difficultyId = computed(() => {
	return problem.value?.difficulty.data.id;
});

const publishedAtString = computed(() => {
	return new Date(problem.value?.publishedAt).toLocaleString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
});

const updatedAtString = computed(() => {
	return new Date(problem.value?.updatedAt).toLocaleString('en-GB', {
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
