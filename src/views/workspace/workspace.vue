<template>
	<Index>
		<div class="flex h-full w-full flex-col">
			<Dock>
				<div>
					<h5 class="font-medium">{{ topicTitle }}</h5>
					<p class="text-sm">Continue your journey at Packill</p>
				</div>
			</Dock>
			<div class="flex w-full flex-1 divide-x overflow-auto">
				<Topic class="w-full flex-1 overflow-auto" />
				<transition name="fade" mode="out-in">
					<Problem
						class="w-[500px] overflow-auto"
						:problem-id="nextProblemId"
						:topic-id="topicId"
						v-if="nextProblemId"
					/>
					<ProblemDone
						class="w-[500px] overflow-auto"
						v-else-if="
							problemSuggestedId === 0 && problemId === '0'
						"
					/>
					<ProblemLoading class="w-[500px]" v-else />
				</transition>
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
import Problem from '@/layouts/problem/problem.vue';
import Dock from '@/layouts/dock/dock.vue';
import { getMyNextProblem } from '@/utils/problem.js';
import router from '@/router/index.js';
import ProblemDone from '@/layouts/problem/problemDone.vue';
import ProblemLoading from '@/layouts/problem/problemLoading.vue';

const route = useRoute();
const topicId = Number(route.params.topicId);
const problemId = route.params.problemId;

const { data } = getTopic(topicId, {
	populate: {
		knowledges: true,
		problems: {
			fields: ['id'],
		},
	},
});
const attributes = computed(() => {
	return data.value?.data?.attributes;
});

const topicTitle = computed(() => {
	return attributes?.value?.title;
});

const problemSuggested = getMyNextProblem(topicId);
const problemSuggestedId = computed(() => {
	return problemSuggested.value;
});

const nextProblemId = computed(() => {
	if (problemId !== '' && problemId !== '0') {
		return Number(problemId);
	} else {
		return undefined;
	}
});

watch(problemSuggestedId, (newId) => {
	if (problemId === '' || (problemId === '0' && newId !== 0)) {
		setTimeout(() => {
			router.push(`/workspace/${topicId}/${newId}`);
		}, 5000);
	}
});
</script>
