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
						<h5 class='font-medium'>{{ quizName }}</h5>
						<p class='text-sm'>{{ $t('quiz.quiz') }}</p>
					</div>
				</transition>
			</Dock>
			<div class='flex space-x-8 flex-1 p-8'>
				<div class='h-fit justify-between rounded-xl border bg-white'>
					<div
						class='flex items-center justify-between border-b px-4 py-2'
					>
						<p class='text-sm font-bold uppercase text-neutral-500'>
							Statistics
						</p>
					</div>
					<div class='w-[250px] space-y-4 p-4'>
						<div class='space-y-4'>
							<div class='flex items-center justify-between'>
								<p class='text-xs text-neutral-500 font-bold uppercase'>Attempts</p>
								<VenustNumberBadge>{{ quizSubmissionCount }}</VenustNumberBadge>
							</div>
						</div>
						<div class='space-y-1'>
							<div class='flex items-center justify-between'>
								<p class='text-xs text-neutral-500 font-bold uppercase'>Last Attempt</p>
							</div>
							<p class='text-xs font-medium text-neutral-700 text-right'>
								{{ lastSubmissionCreatedAtDateTimeString }}</p>
						</div>
					</div>
				</div>
				<div class='flex-1 space-y-8'>
					<h4 class='font-bold'>Past Submissions</h4>
					<div class='grid grid-cols-3 gap-4'>
						<router-link
							class='block bg-slate-50 px-6 py-4 border rounded-lg w-full hover:brightness-95 active:scale-95 transition'
							:to='`/submission/quiz/${quizSubmission.id}`'
							:class="{'border-blue-300': quizSubmission.attributes.state === 'PASS', 'border-yellow-400 bg-stripes bg-stripes-yellow-100': quizSubmission.attributes.state === 'FAIL', 'border-purple-400 bg-gradient-to-tr from-sky-50 to-purple-100': quizSubmission.attributes.state === 'PERFECT'}"
							v-for='quizSubmission in quizSubmissions'>
							<div class='flex items-center justify-between'>
								<h5 class='font-display font-semibold text-neutral-700 uppercase'
									:class='{"text-blue-600": quizSubmission.attributes.state === "PASS", "text-yellow-600": quizSubmission.attributes.state === "FAIL"}'
								>
									{{ quizSubmission.attributes.state }}
								</h5>
								<div class='divide-y'>
									<div class='flex space-x-2 items-center justify-between pb-1'>
										<CheckIcon class='h-4 w-4 text-blue-600'
												   v-if="quizSubmission.attributes.state === 'PASS'" />
										<XMarkIcon class='h-4 w-4 text-yellow-600'
												   v-else-if="quizSubmission.attributes.state === 'FAIL'" />
										<SparklesIcon class='h-4 w-4 text-purple-600'
													  v-else-if="quizSubmission.attributes.state === 'PERFECT'" />
										<p class='text-sm'
										   :class='{"text-blue-600": quizSubmission.attributes.state === "PASS", "text-yellow-600": quizSubmission.attributes.state === "FAIL", "text-purple-600": quizSubmission.attributes.state === "PERFECT"}'
										>
											{{ quizSubmission.attributes.score * 100 }}%
										</p>
									</div>
									<div class='pt-1 text-right'>
										<p class='text-xs font-medium text-neutral-500'>
											{{ moment(quizSubmission.attributes.createdAt).format('LLL') }}
										</p>
										<p class='text-xs font-medium text-neutral-500'>ID: {{ quizSubmission.id }}</p>
									</div>
								</div>
							</div>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import Index from '@/layouts/utils/index.vue';
import Dock from '@/layouts/dock/dock.vue';
import { getQuizSubmissions } from '@/api/submission.js';
import { computed, onUnmounted, watch } from 'vue';
import { CheckIcon, XMarkIcon, SparklesIcon } from '@heroicons/vue/24/outline/index.js';
import { getQuiz } from '@/api/quiz.js';
import moment from 'moment';
import VenustNumberBadge from '@/components/venust/badge/venustBadge.vue';
import { useRouteParams } from '@vueuse/router';

const quizId = useRouteParams('quizId');

const quizResponse = getQuiz(quizId, {
	fields: ['name'],
}, { immediate: false });

const quiz = computed(() => {
	return quizResponse.data.value?.data?.attributes;
});

const quizName = computed(() => {
	return quiz.value?.name;
});

const query = computed(() => {
	return {
		sort: ['createdAt:desc'],
		filters: {
			quiz: quizId.value,
		},
	};
});

const quizSubmissionsResponse = getQuizSubmissions(query, { immediate: false });

if (quizId.value) {
	quizResponse.execute();
	quizSubmissionsResponse.execute();
}

watch(quizId, (newQuizId) => {
	if (newQuizId) {
		quizResponse.execute();
		quizSubmissionsResponse.execute();
	}
});

const quizSubmissions = computed(() => {
	return quizSubmissionsResponse.data.value?.data;
});

const quizSubmissionCount = computed(() => {
	return quizSubmissionsResponse.data.value?.meta?.pagination?.total;
});

const lastSubmissionCreatedAt = computed(() => {
	if (quizSubmissions.value && quizSubmissions.value?.length) {
		return new Date(quizSubmissions.value[0].attributes.createdAt);
	}
});

const lastSubmissionCreatedAtDateTimeString = computed(() => {
	if (lastSubmissionCreatedAt.value) {
		return moment(lastSubmissionCreatedAt.value).format('LLL');
	}
});

onUnmounted(() => {
	if (quizSubmissionsResponse.canAbort.value) {
		quizSubmissionsResponse.abort();
	}
	if (quizResponse.canAbort.value) {
		quizResponse.abort();
	}
});
</script>
