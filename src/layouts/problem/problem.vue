<template>
	<div
		class="flex h-full flex-col bg-white"
		@keydown.enter.prevent="handleSubmit"
	>
		<div
			class="flex items-center justify-between border-b px-4 py-2 bg-stripes bg-stripes-purple-100"
		>
			<div class="flex items-center space-x-1">
				<PencilIcon class="h-4 w-4 text-purple-600" />
				<p class="font-bold uppercase text-purple-600">Problem</p>
			</div>
			<div class="flex items-center space-x-2">
				<VenustDropdown alignment="right">
					<template #toggler>
						<button
							class="block rounded-lg border bg-white p-0.5 text-neutral-700 transition hover:brightness-95 active:scale-90"
						>
							<ListBulletIcon class="h-4 w-4" />
						</button>
					</template>
					<template #container>
						<ProblemList
							:topic-id="topicId"
							:previous-problem-submission="
								previousProblemSubmission
							"
						/>
					</template>
				</VenustDropdown>
				<button
					class="rounded-lg border p-0.5 text-neutral-700 transition hover:brightness-95 active:scale-90"
					v-if="problemId"
					:class="{
						'bg-white': !submissionsIsActive,
						'border-blue-600 bg-blue-600 text-white':
							submissionsIsActive,
					}"
					@click.prevent="toggleSubmissions"
				>
					<ClockIcon class="h-4 w-4" />
				</button>
			</div>
		</div>
		<div
			class="flex items-center justify-between px-6 py-1 font-text text-sm font-semibold uppercase text-blue-600 bg-stripes bg-stripes-blue-100"
			v-if="isCompleted"
		>
			<p>Completed</p>
			<CheckIcon class="h-4 w-4 min-w-fit text-blue-600" />
		</div>
		<div class="relative flex-1 overflow-auto px-6 py-4">
			<div v-show="!submissionsIsActive" class="h-full">
				<div v-if="problemId" class="space-y-4">
					<ProblemContent
						:problem-id="problemId"
						@answers-change="getAnswers"
						@question-length-change="getQuestionLength"
						@is-problem-done-change="getIsProblemDone"
					/>
					<div class="flex items-center justify-between">
						<div class="space-y-1">
							<div
								class="h-fit w-fit rounded-full px-2 py-1"
								:class="{
									'bg-neutral-300': isWaitingResult,
									'bg-blue-100':
										previousProblemSubmissionState === 'AC',
									'bg-yellow-100':
										previousProblemSubmissionState === 'WA',
								}"
							>
								<transition name="fade" mode="out-in">
									<VenustTooltip v-if="isWaitingResult">
										<template #reference>
											<div
												class="flex items-center space-x-1"
											>
												<div
													class="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-500"
												/>
												<p
													class="text-xs font-semibold text-neutral-500"
												>
													{{
														$t(
															'submission.waitingForResult',
														)
													}}
												</p>
											</div>
										</template>
										<template #tooltip>
											{{
												$t(
													'submission.waitingForResultDescription',
												)
											}}
										</template>
									</VenustTooltip>
									<VenustTooltip
										v-else-if="
											previousProblemSubmissionState ===
											'AC'
										"
									>
										<template #reference>
											<div
												class="flex items-center space-x-1"
											>
												<CheckIcon
													class="h-3.5 w-3.5 min-w-fit stroke-2 text-blue-600"
												/>
												<p
													class="text-xs font-semibold text-blue-600"
												>
													{{
														$t(
															'submission.accepted',
														)
													}}
												</p>
											</div>
										</template>
										<template #tooltip>
											{{
												$t(
													'submission.acceptedDescription',
												)
											}}
										</template>
									</VenustTooltip>
									<VenustTooltip
										v-else-if="
											previousProblemSubmissionState ===
											'WA'
										"
									>
										<template #reference>
											<div
												class="flex items-center space-x-1"
											>
												<XMarkIcon
													class="h-3.5 w-3.5 min-w-fit stroke-2 text-yellow-600"
												/>
												<p
													class="text-xs font-semibold text-yellow-600"
												>
													{{
														$t(
															'submission.wrongAnswer',
														)
													}}
												</p>
											</div>
										</template>
										<template #tooltip>
											{{
												$t(
													'submission.wrongAnswerDescription',
												)
											}}
										</template>
									</VenustTooltip>
								</transition>
							</div>
							<p
								class="text-xs font-medium text-neutral-500"
								v-if="previousProblemSubmissionCreatedAtString"
							>
								Submitted at
								<span class="font-semibold">
									{{
										previousProblemSubmissionCreatedAtString
									}}
								</span>
							</p>
						</div>
						<button
							type="submit"
							@click.prevent="handleSubmit"
							class="btn-accent ml-auto flex items-center space-x-1"
							:disabled="!isProblemDone || isWaitingResult"
						>
							<span class="capitalize">
								{{ $t('submission.submit') }}
							</span>
							<ChevronDoubleRightIcon class="h-4 w-4" />
						</button>
					</div>
				</div>
				<ProblemDone v-else-if="problemId === 0" class="h-full" />
			</div>
			<Submissions
				:problem-id="problemId"
				:previous-problem-submission="previousProblemSubmission"
				v-if="problemId"
				v-show="submissionsIsActive"
			/>
		</div>
		<div class="w-full p-4">
			<router-link
				:to="`/workspace/${topicId}`"
				type="button"
				class="btn flex w-full items-center justify-end space-x-1 bg-gradient-to-r from-sky-600 to-purple-600 font-medium text-white"
				v-if="isCompleted"
			>
				<span>Next</span>
				<ChevronDoubleRightIcon class="h-4 w-4" />
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { ClockIcon, ListBulletIcon } from '@heroicons/vue/24/outline';
import { PencilIcon } from '@heroicons/vue/24/solid';
import { computed, onUnmounted, provide, ref, toRefs, watch } from 'vue';
import Submissions from '@/layouts/submission/problemSubmissions.vue';
import ProblemContent from '@/layouts/problem/problemContent.vue';
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';
import ProblemList from '@/layouts/problem/problemList.vue';
import ProblemDone from '@/layouts/problem/problemDone.vue';
import {
	CheckIcon,
	ChevronDoubleRightIcon,
	XMarkIcon,
} from '@heroicons/vue/24/outline/index.js';
import { getMe } from '@/api/me.js';
import {
	getProblemSubmission,
	postProblemSubmission,
} from '@/api/submission.js';
import moment from 'moment';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';

const props = defineProps({
	topicId: Number,
	problemId: Number,
});

const { topicId, problemId } = toRefs(props);

const submissionsIsActive = ref(false);

function toggleSubmissions() {
	submissionsIsActive.value = !submissionsIsActive.value;
}

const meResponse = getMe({
	fields: [''],
	populate: {
		completedProblems: {
			fields: ['id'],
		},
	},
});

const me = computed(() => {
	return meResponse.data.value;
});

const completedProblems = computed(() => {
	return me.value?.completedProblems;
});

const isCompleted = computed(() => {
	if (completedProblems.value) {
		return completedProblems.value.some(
			(completedProblem) => completedProblem.id === problemId.value,
		);
	}
});

const questionLength = ref();

function getQuestionLength(value) {
	questionLength.value = value;
}

const answers = ref([]);

function getAnswers(value) {
	answers.value = value;
}

const isProblemDone = ref();

function getIsProblemDone(value) {
	isProblemDone.value = value;
}

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

const previousProblemSubmissionResponse = getProblemSubmission(
	previousProblemSubmissionId,
	{},
	{ immediate: false },
);

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
	return (
		previousProblemSubmissionIdResponse.isFetching.value ||
		previousProblemSubmissionIdResponse.isFetching.value ||
		previousProblemSubmissionState.value === 'NA'
	);
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

watch(previousProblemSubmission, () => {
	if (
		(previousProblemSubmissionState.value === 'NA' ||
			!previousProblemSubmissionState.value) &&
		previousProblemSubmissionId.value
	) {
		previousProblemSubmissionResponse.execute();
	} else {
		meResponse.execute();
	}
});

onUnmounted(() => {
	if (meResponse.canAbort.value) {
		meResponse.abort();
	}
	if (previousProblemSubmissionIdResponse.canAbort.value) {
		previousProblemSubmissionIdResponse.abort();
	}
	if (previousProblemSubmissionResponse.canAbort.value) {
		previousProblemSubmissionResponse.abort();
	}
});
</script>
