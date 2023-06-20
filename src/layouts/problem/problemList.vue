<template>
	<div class='w-[250px] divide-y rounded-lg border bg-white shadow-lg'>
		<div class='flex items-center justify-between px-3 py-1'>
			<p class='text-sm font-bold uppercase text-neutral-500'>Problems</p>
			<VenustBadge class='text-xs'>{{ problemsCount }}</VenustBadge>
		</div>
		<div v-if='problemsCount' class='p-1'>
			<router-link
				v-for='problem in problems'
				class='flex items-center justify-between rounded bg-white px-2 py-1 hover:brightness-95'
				:to='{params:{problemId: problem.id.toString()}}'
			>
				<div class='flex items-center space-x-2'>
					<DifficultyIndicator
						:difficulty-id='problem.attributes.difficulty.data.id'
					/>
					<p class='text-sm font-medium'>
						{{ problem.attributes.name }}
					</p>
				</div>
				<VenustTooltip v-if='checkIsCompleted(problem.id)'>
					<template #reference>
						<CheckIcon class='w-4 h-4 min-w-fit text-blue-600 stroke-2' />
					</template>
					<template #tooltip>Completed</template>
				</VenustTooltip>
			</router-link>
		</div>
		<div v-else class='flex flex-col items-center justify-center p-4'>
			<div class='space-y-2'>
				<FaceFrownIcon
					class='ml-auto mr-auto h-8 w-8 text-neutral-300'
				/>
				<p
					class='max-w-[300px] text-center text-sm font-medium tracking-wide text-neutral-500'
				>
					Please check back later, as we are
					working to make it available as soon as possible.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/outline/index.js';
import { getProblems } from '@/api/problem.js';
import { computed, onUnmounted, toRefs, watch } from 'vue';
import DifficultyIndicator from '@/layouts/problem/difficultyIndicator.vue';
import VenustBadge from '@/components/venust/badge/venustBadge.vue';
import { FaceFrownIcon } from '@heroicons/vue/24/solid/index.js';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';
import { getMe } from '@/api/me.js';

const props = defineProps({
	topicId: Number,
	previousProblemSubmission: Object,
});

const { topicId, previousProblemSubmission } = toRefs(props);

const query = computed(() => {
	return {
		populate: {
			difficulty: {
				fields: ['id'],
			},
		},
		filters: {
			topic: {
				id: topicId,
			},
		},
	};
});

const problemsResponse = getProblems(query, { immediate: false });

if (topicId.value) {
	problemsResponse.execute();
}

watch(topicId, (newTopicId) => {
	if (newTopicId) {
		problemsResponse.execute();
	}
});

const problems = computed(() => {
	return problemsResponse.data.value?.data;
});

const pagination = computed(() => {
	return problemsResponse.data.value?.meta?.pagination;
});

const problemsCount = computed(() => {
	return pagination.value?.total;
});

const meResponse = getMe({
	fields: [''],
	populate: {
		completedProblems: {
			fields: ['id'],
		},
	},
});

watch(previousProblemSubmission, () => {
	meResponse.execute();
});

const me = computed(() => {
	return meResponse.data.value;
});

const completedProblems = computed(() => {
	return me.value?.completedProblems;
});

const checkIsCompleted = (problemId) => {
	if (completedProblems.value) {
		return completedProblems.value.some((completedProblem) => completedProblem.id === problemId);
	} else
		return false;
};

onUnmounted(() => {
	if (meResponse.canAbort.value) {
		meResponse.abort();
	}
	if (problemsResponse.canAbort.value) {
		problemsResponse.abort();
	}
});
</script>
