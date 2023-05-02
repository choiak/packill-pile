<template>
	<div class="w-[250px] divide-y rounded-lg border bg-white shadow-lg">
		<div class="flex items-center justify-between px-3 py-1">
			<p class="text-sm font-bold uppercase text-neutral-500">Problems</p>
			<VenustBadge class="text-xs">{{ problemsCount }}</VenustBadge>
		</div>
		<div class="p-1">
			<router-link
				v-for="problem in problems"
				class="flex items-center space-x-2 rounded bg-white px-2 py-1 hover:brightness-95"
				:to="problem.id.toString()"
			>
				<DifficultyIndicator
					:difficulty-id="problem.attributes.difficulty.data.id"
				/>
				<p class="text-sm font-medium">{{ problem.attributes.name }}</p>
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { getProblems } from '@/api/problem.js';
import { computed, onUnmounted } from 'vue';
import DifficultyIndicator from '@/components/pile/problem/difficultyIndicator.vue';
import VenustBadge from '@/components/venust/badge/venustBadge.vue';

const props = defineProps({
	topicId: Number,
});

const problemsResponse = getProblems({
	populate: {
		difficulty: {
			fields: ['id'],
		},
	},
	filter: {
		topic: {
			id: props.topicId,
		},
	},
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
