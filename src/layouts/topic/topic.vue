<template>
	<div class="flex h-full flex-col bg-white">
		<div
			class="flex items-center justify-between border-b px-4 py-2 bg-stripes bg-stripes-orange-100"
		>
			<div class="flex items-center space-x-1">
				<BookOpenIcon class="h-4 w-4 text-orange-600" />
				<p class="font-bold uppercase text-orange-600">Topic</p>
			</div>
			<div>
				<VenustBadge>{{ knowledgesCount }} KNOWLEDGES</VenustBadge>
			</div>
		</div>
		<div class="flex flex-1 overflow-auto">
			<div class="flex flex-col justify-between p-4">
				<VenustProgressIndicator
					:sections="knowledgeTitles"
					:now-at-index="currentElementIndex"
					:action="scrollToElement"
					class="overflow-x-visible"
				/>
			</div>
			<div
				class="flex-1 divide-y overflow-auto"
				ref="knowledgesContainerElement"
			>
				<div
					v-for="(knowledge, index) in knowledges"
					:key="knowledge.id"
					ref="knowledgeElements"
				>
					<Knowledge
						:order="index + 1"
						:knowledge-id="knowledge.id"
						class="mx-auto min-w-[300px] max-w-[900px] p-8"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { BookOpenIcon } from '@heroicons/vue/24/solid';
import { getTopic } from '@/api/topic.js';
import Knowledge from '@/layouts/knowledge/knowledge.vue';
import { computed, onUnmounted, ref, watch } from 'vue';
import VenustProgressIndicator from '@/components/venust/progress/venustProgressIndicator.vue';
import { useElementBounding } from '@vueuse/core';
import VenustBadge from '@/components/venust/badge/venustBadge.vue';
import { normalize } from '@/utils/format.js';
import { useRouteHash, useRouteParams } from '@vueuse/router';
import { scrollToElement } from '@/utils/dom.js';

const paramTopicId = useRouteParams('topicId');
const paramFragment = useRouteHash();

const topicResponse = getTopic(
	paramTopicId,
	{
		populate: {
			knowledges: {
				fields: ['id', 'title'],
			},
			problems: {
				fields: ['id'],
			},
		},
	},
	{ immediate: false },
);

if (paramTopicId.value) {
	topicResponse.execute();
}

watch(paramTopicId, (newTopicId) => {
	if (newTopicId) {
		topicResponse.execute();
	}
});

const isLoading = computed(() => {
	return (
		topicResponse.isFetching.value ||
		(!topicResponse.isFetching.value && !topicResponse.isFinished.value)
	);
});

watch(isLoading, (state) => {
	if (!state) {
		setTimeout(() => {
			scrollToElement(paramFragment.value);
		}, 300);
	}
});

watch(paramFragment, (newFragment) => {
	scrollToElement(newFragment);
});

const topic = computed(() => {
	return topicResponse.data.value?.data;
});

const attributes = computed(() => {
	return topic.value?.attributes;
});

const knowledges = computed(() => {
	return attributes.value?.knowledges?.data;
});

const knowledgesCount = computed(() => {
	return knowledges.value?.length;
});

const knowledgeTitles = computed(() => {
	if (knowledges.value) {
		return knowledges.value.map((knowledge) => {
			return {
				name: knowledge.attributes.title,
				arg: `#${normalize(knowledge.attributes.title)}`,
			};
		});
	}
});

const knowledgesContainerElement = ref(null);
const { y } = useElementBounding(knowledgesContainerElement);

const knowledgeElements = ref(null);

const knowledgeElementsBounding = computed(() => {
	if (knowledgeElements.value && knowledgeElements.value.length) {
		return Array.from(knowledgeElements.value).map((knowledgeElement) =>
			useElementBounding(knowledgeElement),
		);
	} else {
		return null;
	}
});

const currentElementIndex = computed(() => {
	if (
		knowledgeElementsBounding.value &&
		knowledgeElementsBounding.value.length
	) {
		return knowledgeElementsBounding.value.findIndex(
			(knowledgeElementBounding) =>
				knowledgeElementBounding.top.value <= y.value &&
				y.value < knowledgeElementBounding.bottom.value,
		);
	} else {
		return null;
	}
});

onUnmounted(() => {
	if (topicResponse.canAbort.value) {
		topicResponse.abort();
	}
});
</script>
