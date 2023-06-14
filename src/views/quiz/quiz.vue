<template>
	<Index>
		<div class='flex h-full w-full flex-col'>
			<Dock>
				<transition name='fade' mode='out-in'>
					<div class='space-y-1' v-if='isLoading'>
						<div class='rounded bg-slate-200 animate-pulse w-32 h-7' />
						<div class='rounded bg-slate-200 animate-pulse w-20 h-4' />
					</div>
					<div v-else>
						<h5 class='font-medium'>{{ name }}</h5>
						<p class='text-sm'>{{ $t('quiz.quiz') }}</p>
					</div>
				</transition>
			</Dock>
			<div class='flex-1 flex p-8 justify-between'>
				<div class='flex flex-col justify-between'>
					<VenustProgressIndicator :sections='problemNamesAndArgs' :now-at-index='currentProblemIndex'
											 :action='goToProblemIndex' class='overflow-x-visible' />
				</div>
				<div class='flex-1 flex items-center justify-center'>
					<button
						:class='{"invisible": atFirstProblem}'
						class='flex flex-col justify-center bg-orange-600 rounded-l-lg p-2 h-1/2 transition hover:scale-x-110'
						@click.prevent='goToPreviousProblem'>
						<ChevronLeftIcon class='w-6 h-6 min-w-fit text-white' />
					</button>
					<div class='h-full bg-white p-8 w-[1000px] rounded-xl border shadow-lg'>
						<div v-for='(problem, index) in problems'>
							<ProblemContent :problem-id='problem.id'
											v-show='index === currentProblemIndex'
											@answers-change='getAnswers'
											@is-problem-done-change='getProblemDone(problem.id, $event)'
							/>
						</div>
					</div>
					<button
						:class='{"invisible": atLastProblem}'
						class='flex flex-col justify-center bg-blue-600 rounded-r-lg p-2 h-1/2 transition hover:scale-x-110'
						@click.prevent='goToNextProblem'>
						<ChevronRightIcon class='w-6 h-6 min-w-fit text-white' />
					</button>
				</div>
				<div class='flex flex-col justify-between'>
					<div></div>
					<button
						type='submit'
						@click.prevent='handleSubmit'
						class='btn-accent flex items-center space-x-1'
						:disabled='!isQuizDone'
					>
						<span class='capitalize'>{{ $t('submission.submit') }}</span>
						<ChevronDoubleRightIcon class='h-4 w-4' />
					</button>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import { ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline/index.js';
import Index from '@/layouts/utils/index.vue';
import Dock from '@/layouts/dock/dock.vue';
import ProblemContent from '@/layouts/problem/problemContent.vue';
import { getQuiz } from '@/api/quiz.js';
import { computed, provide, ref } from 'vue';
import VenustProgressIndicator from '@/components/venust/progress/venustProgressIndicator.vue';
import { useRouteParams } from '@vueuse/router';
import { postQuizSubmission } from '@/api/submission.js';

provide('isInsideQuiz', true);

const quizId = useRouteParams('id', null);

const quizResponse = getQuiz(quizId, {
	populate: {
		problems: {
			fields: ['id', 'name'],
		},
	},
});

const isLoading = computed(() => {
	return quizResponse.isFetching.value || (!quizResponse.isFetching.value && !quizResponse.isFinished.value);
});

const quiz = computed(() => {
	return quizResponse.data.value?.data?.attributes;
});

const name = computed(() => {
	return quiz.value?.name;
});

const problems = computed(() => {
	return quiz.value?.problems?.data;
});

const problemNamesAndArgs = computed(() => {
	if (problems.value) {
		return problems.value.map((problem, index) => {
			return { name: problem.attributes.name, arg: index };
		});
	} else {
		return null;
	}
});

const currentProblemIndex = ref(0);

const atFirstProblem = computed(() => {
	return currentProblemIndex.value === 0;
});

const atLastProblem = computed(() => {
	return currentProblemIndex.value === problems.value?.length - 1;
});

const currentProblemId = computed(() => {
	if (problems.value && problems.value.length) {
		return problems.value[currentProblemIndex.value].id;
	} else {
		return null;
	}
});

function goToNextProblem() {
	if (currentProblemIndex.value < problems.value.length - 1) {
		currentProblemIndex.value++;
	}
}

function goToPreviousProblem() {
	if (currentProblemIndex.value > 0) {
		currentProblemIndex.value--;
	}
}

function goToProblemIndex(index) {
	if (index < problems.value.length && index >= 0) {
		currentProblemIndex.value = index;
	}
}

const answers = ref([]);

function getAnswers(value) {
	if (answers.value.some((answer) => answer.problemId === currentProblemId.value)) {
		const index = answers.value.findIndex((answer) => answer.problemId === currentProblemId.value);
		if (value.length) {
			answers.value[index] = { problemId: currentProblemId.value, questions: value };
		} else {
			answers.value.splice(index, 1);
		}
	} else {
		answers.value.push({ problemId: currentProblemId.value, questions: value });
	}
}

const problemDoneStates = ref([]);

function getProblemDone(problemId, state) {
	if (problemDoneStates.value.some((problemDoneState) => problemDoneState.problemId === problemId)) {
		const index = problemDoneStates.value.findIndex((problemDoneState) => problemDoneState.problemId === problemId);
		problemDoneStates.value[index] = { problemId, isProblemDone: state };
	} else {
		problemDoneStates.value.push({ problemId, isProblemDone: state });
	}
}

const isQuizDone = computed(() => {
	return problemDoneStates.value.reduce((accumulator, currentValue) => accumulator && currentValue.isProblemDone, true);
});

const previousQuizSubmissionIdResponse = postQuizSubmission(quizId, answers,
	{
		fields: ['id'],
	},
	{
		immediate: false,
	});

function handleSubmit() {
	if (isQuizDone.value) {
		previousQuizSubmissionIdResponse.execute();
	}
}
</script>
