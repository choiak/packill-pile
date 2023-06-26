<template>
	<form class="space-y-8">
		<div class="flex items-center justify-between">
			<transition name="fade" mode="out-in">
				<div v-if="isLoading" class="space-y-1">
					<div class="h-6 w-48 animate-pulse rounded bg-slate-200" />
					<div class="flex space-x-2">
						<div
							class="h-5 w-16 animate-pulse rounded bg-slate-200"
						/>
						<p class="animate-pulse text-sm text-slate-400">•</p>
						<div
							class="h-5 w-16 animate-pulse rounded bg-slate-200"
						/>
					</div>
				</div>
				<div v-else>
					<h5 class="font-semibold">{{ name }}</h5>
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
			</transition>
			<DifficultyIndicator :difficulty-id="difficultyId" show-name />
		</div>
		<div class="space-y-8">
			<div
				v-for="item in content"
				:key="`${item.__component}-${item.id}`"
			>
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
		</div>
	</form>
</template>

<script setup>
import DifficultyIndicator from '@/layouts/problem/difficultyIndicator.vue';
import { computed, onUnmounted, ref, toRefs, watch } from 'vue';
import { getProblem } from '@/api/problem.js';
import Question from '@/layouts/question/question.vue';
import moment from 'moment';
import { checkArraysAreEqual } from '@/utils/array.js';

const emit = defineEmits([
	'previousProblemSubmissionChange',
	'answersChange',
	'questionLengthChange',
	'isProblemDoneChange',
]);
const props = defineProps({
	problemId: Number,
});

const { problemId } = toRefs(props);

const problemResponse = getProblem(
	problemId,
	{
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
	},
	{ immediate: false },
);

if (problemId.value) {
	problemResponse.execute();
}

watch(problemId, (newProblemId, oldProblemId) => {
	if (newProblemId) {
		problemResponse.execute();
	}
	if (newProblemId !== oldProblemId) {
		answers.value = [];
	}
});

const isLoading = computed(() => {
	return (
		problemResponse.isFetching.value ||
		(!problemResponse.isFetching.value &&
			!problemResponse.isFinished.value) ||
		!problemId.value
	);
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

watch(content, (newContent) => {
	emit(
		'questionLengthChange',
		newContent.filter(
			(item) => item.__component === 'relation.question-connector',
		).length,
	);
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
	const answerIndex = answers.value.findIndex(
		(answer) => answer?.questionId === id,
	);
	if (answerIndex !== -1) {
		if (answer.length) {
			answers.value[answerIndex] = {
				questionId: id,
				value: answer,
			};
		} else {
			answers.value = answers.value.filter(
				(answer) => answer?.questionId !== id,
			);
		}
	} else {
		if (answer.length) {
			answers.value.push({
				questionId: id,
				value: answer,
			});
		}
	}
}

watch(
	answers,
	(newAnswers) => {
		emit('answersChange', newAnswers);
	},
	{ deep: true },
);

const isProblemDone = computed(() => {
	if (content.value && content.value.length) {
		return checkArraysAreEqual(
			answers.value.map((answer) => answer.questionId).sort(),
			content.value
				.filter(
					(item) =>
						item.__component === 'relation.question-connector',
				)
				.map((item) => item?.question?.data?.id)
				.sort(),
		);
	} else {
		return false;
	}
});

watch(
	isProblemDone,
	(newIsDone) => {
		emit('isProblemDoneChange', newIsDone);
	},
	{ immediate: true },
);

onUnmounted(() => {
	if (problemResponse.canAbort.value) {
		problemResponse.abort();
	}
});
</script>
