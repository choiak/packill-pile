<template>
	<div class='w-[250px] divide-y rounded-lg border bg-white shadow-lg'>
		<div class='flex items-center justify-between px-3 py-1'>
			<p class='text-sm font-bold uppercase text-neutral-500'>Problems</p>
			<VenustBadge class='text-xs'>{{ problemsCount }}</VenustBadge>
		</div>
		<div v-if='problemsCount' class='p-1'>
			<router-link
				v-for='problem in problems'
				class='flex items-center space-x-2 rounded bg-white px-2 py-1 hover:brightness-95'
				:to='problem.id.toString()'
			>
				<DifficultyIndicator
					:difficulty-id='problem.attributes.difficulty.data.id'
				/>
				<p class='text-sm font-medium'>{{ problem.attributes.name }}</p>
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
import { getProblems } from '@/api/problem.js';
import { computed, onUnmounted, watch } from 'vue';
import DifficultyIndicator from '@/components/pile/problem/difficultyIndicator.vue';
import VenustBadge from '@/components/venust/badge/venustBadge.vue';
import { FaceFrownIcon } from '@heroicons/vue/24/solid/index.js';

const props = defineProps({
	topicId: Number,
});

const propTopicId = computed(() => {
	return props.topicId;
});

const query = computed(() => {
	return {
		populate: {
			difficulty: {
				fields: ['id'],
			},
		},
		filters: {
			topic: {
				id: propTopicId.value,
			},
		},
	};
});

const problemsResponse = getProblems(query, { immediate: false });

if (propTopicId.value) {
	problemsResponse.execute();
}

watch(propTopicId, (newTopicId) => {
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

onUnmounted(() => {
	if (problemsResponse.canAbort.value) {
		problemsResponse.abort();
	}
});
</script>
