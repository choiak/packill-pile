<template>
	<div class='flex h-full flex-col bg-white'>
		<div class='flex items-center justify-between border-b px-4 py-2'>
			<div class='flex items-center space-x-1'>
				<PencilIcon class='h-4 w-4 text-neutral-500' />
				<p class='font-bold uppercase text-neutral-500'>Problem</p>
			</div>
			<div class='flex items-center space-x-2'>
				<VenustDropdown alignment='right'>
					<template #toggler>
						<button
							class='block rounded-lg border bg-white p-0.5 text-neutral-700 transition hover:brightness-95 active:scale-90'
						>
							<ListBulletIcon class='h-4 w-4' />
						</button>
					</template>
					<template #container>
						<ProblemList :topic-id='topicId' />
					</template>
				</VenustDropdown>
				<button
					class='rounded-lg border p-0.5 text-neutral-700 transition hover:brightness-95 active:scale-90'
					v-if='problemId'
					:class="{
						'bg-white': !submissionsIsActive,
						'border-blue-600 bg-blue-600 text-white':
							submissionsIsActive,
					}"
					@click.prevent='toggleSubmissions'
				>
					<ClockIcon class='h-4 w-4' />
				</button>
			</div>
		</div>
		<div
			class='bg-stripes bg-stripes-blue-100 uppercase text-sm text-blue-600 font-semibold font-text flex justify-between items-center py-1 px-6'
			v-if='isCompleted'>
			<p>Completed</p>
			<CheckIcon class='w-4 h-4 text-blue-600 min-w-fit' />
		</div>
		<div
			class='relative flex-1 overflow-auto px-6 py-4'
		>
			<div v-show='!submissionsIsActive' class='h-full'>
				<ProblemContent
					:problem-id='problemId'
					v-if='problemId'
					@previous-problem-submission-change='getPreviousProblemSubmission'
				/>
				<ProblemDone v-else-if='problemId === 0' class='h-full' />
			</div>
			<Submissions :problem-id='problemId' :previous-problem-submission='previousProblemSubmission'
						 v-show='submissionsIsActive' />
		</div>
		<div class='p-4 w-full'>
			<router-link
				:to='`/workspace/${topicId}`'
				type='button'
				class='btn flex items-center space-x-1 w-full justify-end font-medium bg-gradient-to-r from-sky-600 to-purple-600 text-white'
				v-if='isCompleted'
			>
				<span>Next</span>
				<ChevronDoubleRightIcon class='h-4 w-4' />
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { ClockIcon, ListBulletIcon } from '@heroicons/vue/24/outline';
import { PencilIcon } from '@heroicons/vue/24/solid';
import { computed, onUnmounted, ref, toRefs, watch } from 'vue';
import Submissions from '@/layouts/submission/problemSubmissions.vue';
import ProblemContent from '@/layouts/problem/problemContent.vue';
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';
import ProblemList from '@/layouts/problem/problemList.vue';
import ProblemDone from '@/layouts/problem/problemDone.vue';
import { CheckIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/outline/index.js';
import { getMe } from '@/api/me.js';

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
		return completedProblems.value.some((completedProblem) => completedProblem.id === problemId.value);
	}
});

const previousProblemSubmission = ref({});

function getPreviousProblemSubmission(value) {
	previousProblemSubmission.value = value;
}

watch(previousProblemSubmission, () => {
	meResponse.execute();
});

onUnmounted(() => {
	if (meResponse.canAbort.value) {
		meResponse.abort();
	}
});
</script>
