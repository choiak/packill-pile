<template>
	<Index>
		<div class="flex h-full w-full space-x-4 rounded-xl bg-white p-2">
			<div>
				<Back />
			</div>
			<div class="flex flex-1 flex-col space-y-4">
				<div
					class="flex w-full items-center justify-between rounded-lg bg-neutral-200/40 px-4 py-4 shadow"
				>
					<div class="space-y-2">
						<div>
							<p class="text-sm text-neutral-500">
								Dev Tools / Git
							</p>
							<h3 class="font-semibold">{{ topicTitle }}</h3>
						</div>
						<div class="flex space-x-2">
							<p
								class="rounded bg-orange-600 px-2 text-xs font-medium text-white"
							>
								Incomplete
							</p>
						</div>
					</div>
					<div class="flex space-x-4 text-sm font-medium">
						<div>
							<h3>{{ knowledgeCount }}</h3>
							<p class="text-neutral-500">Knowledge</p>
						</div>
						<div>
							<h3>{{ readingMinutes }}</h3>
							<p class="text-neutral-500">Minutes reading</p>
						</div>
						<div>
							<h3>{{ solvedCount }}</h3>
							<p class="text-neutral-500">Problems solved</p>
						</div>
					</div>
				</div>
				<div class="flex flex-1 space-x-4 overflow-auto">
					<Topic />
					<Problem />
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import Index from '@/layouts/pile/index.vue';
import Back from '@/components/button/back.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getTopic } from '@/api/workspace.js';
import Topic from '@/layouts/pile/topic.vue';
import Problem from '@/layouts/pile/problem.vue';

const route = useRoute();
const topicId = route.params.topicId;
const topicObject = await getTopic(topicId);
const topicTitle = topicObject.attributes.Title;
const knowledgeCount = ref(topicObject.attributes.knowledges.data.length);
// const readingMinutes = ref(Math.round(content.value.length / 250));
const solvedCount = ref(5);
</script>
