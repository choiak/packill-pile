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
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getTopic } from '@/api/topic.js';
import Topic from '@/layouts/topic/topic.vue';
import Dock from '@/layouts/dock/dock.vue';
import { getMyNextProblem } from '@/utils/problem.js';
import router from '@/router/index.js';

const route = useRoute();
const paramTopicId = Number(route.params.topicId) || null;
const paramProblemId = Number(route.params.problemId) || null;

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
	return problemSuggested.value;
});

watch(problemIdSuggested, (newId) => {
	if (!paramProblemId || (paramProblemId === '0' && newId !== 0)) {
		setTimeout(() => {
			router.push(`/workspace/${paramTopicId}/${newId}`);
		}, 5000); //debug
	}
});
</script>
