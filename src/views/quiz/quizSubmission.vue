<template>
	<Index>
		<div class='flex h-full w-full flex-col'>
			<Dock>
				<transition name='fade' mode='out-in'>
					<!--					<div class='space-y-1' v-if=''>-->
					<!--						<div class='rounded bg-slate-200 animate-pulse w-32 h-7' />-->
					<!--						<div class='rounded bg-slate-200 animate-pulse w-20 h-4' />-->
					<!--					</div>-->
					<div>
						<h5 class='font-medium'>Quiz</h5>
						<p class='text-sm'>{{ $t('quiz.quiz') }}</p>
					</div>
				</transition>
			</Dock>
			<div class='flex-1 flex flex-col overflow-auto'>
				<div class='p-2 w-full'>
					<div class='flex items-center justify-between bg-white rounded-lg px-6 py-4 border'
						 :class="{'border-blue-300': state === 'PASS', 'border-yellow-400 bg-stripes bg-stripes-yellow-100': state === 'FAIL', 'border-purple-400 bg-gradient-to-tr from-sky-50 to-purple-100': state === 'PERFECT'}"
					>
						<div class='flex space-x-2 items-center justify-between pb-1'>
							<CheckIcon class='h-6 w-6 text-blue-600'
									   v-if="state === 'PASS'" />
							<XMarkIcon class='h-6 w-6 text-yellow-600'
									   v-else-if="state === 'FAIL'" />
							<SparklesIcon class='h-6 w-6 text-purple-600'
										  v-else-if="state === 'PERFECT'" />
							<p class='font-semibold'
							   :class='{"text-blue-600": state === "PASS", "text-yellow-600": state === "FAIL", "text-purple-600": state === "PERFECT"}'
							>
								{{ score * 100 }}%
							</p>
						</div>
						<h5 class='font-display font-semibold text-neutral-700 uppercase'
							:class='{"text-blue-600": state === "PASS", "text-yellow-600": state === "FAIL"}'
						>
							{{ state }}
						</h5>
						<div class='pt-1 text-right'>
							<p class='text-xs font-medium text-neutral-500'>
								{{ createdAtDateTimeString }}
							</p>
							<p class='text-xs font-medium text-neutral-500'>Quiz Submission ID: {{ quizSubmissionId }}</p>
						</div>
					</div>
				</div>
				<div class='flex-1 flex space-x-4 p-8 overflow-auto'>
					<div v-for='(problemSubmission,index) in problemSubmissions' class='flex flex-col space-y-2'>
						<h5
							class='w-fit rounded-lg bg-blue-600 px-2 font-semibold uppercase tracking-widest text-white'
						>
							Q{{ index + 1 }}
						</h5>
						<ProblemSubmission :problem-submission-id='problemSubmission.id' class='w-[500px] flex-1'/>
					</div>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import Index from '@/layouts/utils/index.vue';
import Dock from '@/layouts/dock/dock.vue';
import { getQuizSubmission } from '@/api/submission.js';
import { computed, onUnmounted, watch } from 'vue';
import moment from 'moment';
import { CheckIcon, SparklesIcon, XMarkIcon } from '@heroicons/vue/24/outline/index.js';
import ProblemSubmission from '@/layouts/submission/problemSubmission.vue';
import { useRouteParams } from '@vueuse/router';

const quizSubmissionId = useRouteParams('quizSubmissionId');

const quizSubmissionResponse = getQuizSubmission(quizSubmissionId, {
	populate: {
		problemSubmissions: {
			fields: ['id']
		},
	}
}, { immediate: false });

if (quizSubmissionId.value) {
	quizSubmissionResponse.execute();
}

watch(quizSubmissionId, (newQuizSubmissionId) => {
	if (newQuizSubmissionId) {
		quizSubmissionResponse.execute();
	}
});

const quizSubmission = computed(() => {
	return quizSubmissionResponse.data.value?.data?.attributes;
});

const state = computed(() => {
	return quizSubmission.value?.state;
});

const score = computed(() => {
	return quizSubmission.value?.score;
});

const createdAt = computed(() => {
	if (quizSubmission.value?.createdAt) {
		return new Date(quizSubmission.value?.createdAt);
	} else {
		return null;
	}
});

const createdAtDateTimeString = computed(() => {
	if (createdAt.value) {
		return moment(createdAt.value).format('LLL');
	} else {
		return null;
	}
});

const problemSubmissions = computed(() => {
	return quizSubmission.value?.problemSubmissions?.data;
});

onUnmounted(() => {
	if (quizSubmissionResponse.canAbort.value) {
		quizSubmissionResponse.abort();
	}
});
</script>
