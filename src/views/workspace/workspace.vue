<template>
	<Index>
		<div class='flex h-full w-full flex-col'>
			<Dock>
				<div>
					<h5 class='font-medium'>{{ topicTitle }}</h5>
					<p class="text-sm">Workspace</p>
				</div>
			</Dock>
			<div class='flex w-full flex-1 divide-x overflow-auto'>
				<Topic class='w-full flex-1 overflow-auto' />
				<router-view class='w-[500px] overflow-auto' v-slot='{ Component }'>
					<keep-alive>
						<component :is="Component" :key="$route.fullPath"></component>
					</keep-alive>
				</router-view>
			</div>
		</div>
	</Index>
</template>

<script setup>
import Index from '@/layouts/utils/index.vue';
import { computed, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getTopic } from '@/api/topic.js';
import Dock from '@/layouts/dock/dock.vue';
import { getMyNextProblem } from '@/utils/problem.js';
import router from '@/router/index.js';

const route = useRoute();
const paramTopicId = Number(route.params.topicId) || null;
const paramProblemId = computed(() => {
	return Number(route.params.problemId) || null;
});

const topicResponse = getTopic(paramTopicId, {
	populate: {
		knowledges: true,
		problems: {
			fields: ['id'],
		},
	},
});
const topic = computed(() => {
	return topicResponse.data.value?.data?.attributes;
});

const topicTitle = computed(() => {
	return topic?.value?.title;
});

const problemSuggested = getMyNextProblem(paramTopicId);
const problemIdSuggested = computed(() => {
	return problemSuggested.id.value;
});

watch(problemIdSuggested, (newId) => {
	if (!paramProblemId.value || (paramProblemId.value === '0' && newId !== 0)) {
		router.replace(`/workspace/${paramTopicId}/${newId}`);
	}
});

watch(paramProblemId, () => {
	if (topicResponse.canAbort.value) {
		topicResponse.abort();
	}
});

onUnmounted(() => {
	if (topicResponse.canAbort.value) {
		topicResponse.abort();
	}
});
</script>
