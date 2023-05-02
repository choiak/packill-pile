<template>
	<div
		class="flex flex-col items-center space-y-4"
	>
		<div class="flex w-full items-center justify-between">
			<div class="space-y-2">
				<h5
					class="w-fit rounded-lg bg-blue-600 px-2 font-semibold uppercase tracking-widest text-white"
				>
					{{ order + 1 }}. {{ title }}
				</h5>
				<div class="flex items-center space-x-1">
					<div v-for="area in areas">
						<div
							class="rounded border px-1 text-xs font-medium text-neutral-500"
						>
							{{ area?.attributes?.name }}
						</div>
					</div>
				</div>
			</div>
			<div></div>
		</div>
		<div
			v-html="content"
			class="prose-article w-full text-justify font-text"
		/>
	</div>
</template>

<script setup>
import 'highlight.js/styles/a11y-dark.css';
import { computed, onUnmounted } from 'vue';
import { getKnowledge } from '@/api/knowledge.js';

const props = defineProps({
	id: Number,
	order: Number,
});

const knowledgeResponse = getKnowledge(props.id, {
	populate: {
		author: {
			populate: ['avatar'],
		},
		areas: true,
	},
});

const knowledge = computed(() => {
	return knowledgeResponse.data.value?.data;
});

const attributes = computed(() => {
	return knowledge.value?.attributes;
});

const title = computed(() => {
	return attributes.value?.title;
});

const areas = computed(() => {
	return attributes?.value?.areas?.data;
});

const content = computed(() => {
	return attributes.value?.content;
});

const publishDateTime = computed(() => {
	return new Date(attributes?.value?.publishedAt).toLocaleString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	});
});

onUnmounted(() => {
	if (knowledgeResponse.canAbort.value) {
		knowledgeResponse.abort();
	}
});
</script>
