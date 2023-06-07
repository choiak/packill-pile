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
		</div>
		<div class='flex justify-between items-center' v-if='!isLoading'>
			<div class='space-y-1'>
				<div
					class='rounded-full px-2 py-1 h-fit w-fit'
					:class='{"bg-neutral-300": isWaitingResult, "bg-blue-100": previousProblemSubmissionState === "AC", "bg-yellow-100": previousProblemSubmissionState === "WA"}'
				>
					<transition name='fade' mode='out-in'>
						<VenustTooltip v-if='isWaitingResult'>
							<template #reference>
								<div class='flex items-center space-x-1'>
									<div class='rounded-full h-1.5 w-1.5 bg-neutral-500 animate-pulse' />
									<p class='text-neutral-500 font-semibold text-xs'>
										{{ $t('submission.waitingForResult') }}</p>
								</div>
							</template>
							<template #tooltip>{{ $t('submission.waitingForResultDescription') }}</template>
						</VenustTooltip>
						<VenustTooltip v-else-if='previousProblemSubmissionState === "AC"'>
							<template #reference>
								<div class='flex items-center space-x-1'>
									<CheckIcon class='w-3.5 h-3.5 text-blue-600 stroke-2 min-w-fit' />
									<p class='text-blue-600 font-semibold text-xs'>{{ $t('submission.accepted') }}</p>
								</div>
							</template>
							<template #tooltip>{{ $t('submission.acceptedDescription') }}</template>
						</VenustTooltip>
						<VenustTooltip v-else-if='previousProblemSubmissionState === "WA"'>
							<template #reference>
								<div class='flex items-center space-x-1'>
									<XMarkIcon class='w-3.5 h-3.5 text-yellow-600 stroke-2 min-w-fit' />
									<p class='text-yellow-600 font-semibold text-xs'>{{ $t('submission.wrongAnswer') }}</p>
								</div>
							</template>
							<template #tooltip>{{ $t('submission.wrongAnswerDescription') }}</template>
						</VenustTooltip>
					</transition>
				</div>
				<p class='text-neutral-500 text-xs font-medium' v-if='previousProblemSubmissionCreatedAtString'>
					Submitted at <span
					class='font-semibold'>{{ previousProblemSubmissionCreatedAtString }}</span></p>
			</div>
			<button
				type='submit'
				@click.prevent='handleSubmit'
				class='btn-accent flex items-center space-x-1 ml-auto'
				:disabled='!isCompleted || isWaitingResult'
			>
				<span class='capitalize'>{{ $t('submission.submit') }}</span>
				<ChevronDoubleRightIcon class='h-4 w-4' />
			</button>
		</div>
	</form>
</template>

<script setup>
import DifficultyIndicator from '@/components/pile/problem/difficultyIndicator.vue';
import { ChevronDoubleRightIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline/index.js';
import { computed, onUnmounted, provide, ref, watch } from 'vue';
import { getProblem } from '@/api/problem.js';
import {
	getProblemSubmission,
	postProblemSubmission,
} from '@/api/submission.js';
import Question from '@/layouts/question/question.vue';
import moment from 'moment';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';

const emit = defineEmits(['previousProblemSubmissionChange']);
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

const publishedAt = computed(() => {
	if (problem.value?.publishedAt) {
		return new Date(problem.value?.publishedAt);
	}
});

const publishedAtString = computed(() => {
	if (publishedAt.value) {
		return moment(publishedAt.value).format('L');
	}
});

const updatedAt = computed(() => {
	if (problem.value?.updatedAt) {
		return new Date(problem.value?.updatedAt);
	}
});

const updatedAtString = computed(() => {
	if (updatedAt.value) {
		return moment(updatedAt.value).format('L');
	}
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

const previousProblemSubmissionIdResponse = postProblemSubmission(
	props.problemId,
	answers,
	{
		fields: ['id'],
	},
	{
		immediate: false,
	},
);

const previousProblemSubmissionId = computed(() => {
	return previousProblemSubmissionIdResponse.data.value?.data?.id;
});

const previousProblemSubmissionResponse = getProblemSubmission(previousProblemSubmissionId, {}, { immediate: false });

const previousProblemSubmission = computed(() => {
	return previousProblemSubmissionResponse.data.value?.data?.attributes;
});

const previousProblemSubmissionState = computed(() => {
	return previousProblemSubmission.value?.state;
});

const previousProblemSubmissionCreatedAt = computed(() => {
	if (previousProblemSubmission.value?.createdAt) {
		return new Date(previousProblemSubmission.value?.createdAt);
	} else {
		return null;
	}
});

const previousProblemSubmissionCreatedAtString = computed(() => {
	if (previousProblemSubmissionCreatedAt.value) {
		return moment(previousProblemSubmissionCreatedAt.value).format('LLL');
	} else {
		return null;
	}
});

const isWaitingResult = computed(() => {
	return (previousProblemSubmissionIdResponse.isFetching.value || previousProblemSubmissionIdResponse.isFetching.value || previousProblemSubmissionState.value === 'NA');
});

provide('isWaitingResult', isWaitingResult);

function handleSubmit() {
	if (isCompleted) {
		previousProblemSubmissionIdResponse.execute();
	}
}

watch(previousProblemSubmissionId, (newId) => {
	if (newId) {
		previousProblemSubmissionResponse.execute();
	}
});

watch(previousProblemSubmission, (newSubmission) => {
	emit('previousProblemSubmissionChange', newSubmission);
	if ((previousProblemSubmissionState.value === 'NA' || !previousProblemSubmissionState.value) && previousProblemSubmissionId.value) {
		previousProblemSubmissionResponse.execute();
	}
});

onUnmounted(() => {
	if (problemResponse.canAbort.value) {
		problemResponse.abort();
	}
	if (previousProblemSubmissionResponse.canAbort.value) {
		previousProblemSubmissionResponse.abort();
	}
	if (previousProblemSubmissionIdResponse.canAbort.value) {
		previousProblemSubmissionIdResponse.abort();
	}
});
</script>
