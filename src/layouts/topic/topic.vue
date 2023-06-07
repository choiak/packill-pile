<template>
	<div class='flex h-full flex-col bg-white'>
		<div class='flex items-center justify-between border-b px-4 py-2'>
			<div class='flex items-center space-x-1'>
				<DocumentTextIcon class='h-4 w-4 text-neutral-500' />
				<p class='font-bold uppercase text-neutral-500'>Topic</p>
			</div>
			<div>
				<VenustBadge>{{ knowledgesCount }} KNOWLEDGES</VenustBadge>
			</div>
		</div>
		<div class='flex-1 flex overflow-auto'>
			<div class='p-4 flex flex-col justify-between'>
				<VenustProgressIndicator :sections='knowledgeTitles' :now-at-index='currentElementIndex'
										 class='overflow-x-visible' />
				<div
					class='rounded-full bg-neutral-300 p-1 w-fit hover:bg-blue-600 text-neutral-500 hover:text-white transition'>
					<LanguageIcon class='w-4 h-4' />
				</div>
			</div>
			<div class='flex-1 divide-y overflow-auto' ref='knowledgesContainerElement'>
				<div v-for='(knowledge, index) in knowledges' :key='knowledge.id' ref='knowledgeElements'>
					<Knowledge
						:order='index'
						:knowledge-id='knowledge.id'
						class='mx-auto p-8 min-w-[300px] max-w-[900px]'
						@title='getKnowledgeTitles'
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { DocumentTextIcon, LanguageIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';
import { getTopic } from '@/api/topic.js';
import Knowledge from '@/layouts/knowledge/knowledge.vue';
import { computed, onUnmounted, ref, watch } from 'vue';
import VenustProgressIndicator from '@/components/venust/progress/venustProgressIndicator.vue';
import { useElementBounding } from '@vueuse/core';
import VenustBadge from '@/components/venust/badge/venustBadge.vue';

const route = useRoute();
const paramTopicId = computed(() => {
	return route.params.topicId || null;
});

const topicResponse = getTopic(paramTopicId, {
	populate: {
		knowledges: true,
		problems: {
			fields: ['id'],
		},
	},
}, { immediate: false });

if (paramTopicId.value) {
	topicResponse.execute();
}

watch(paramTopicId, (newTopicId) => {
	if (newTopicId) {
		topicResponse.execute();
	}
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

const knowledgeTitles = ref([]);

function getKnowledgeTitles(value) {
	knowledgeTitles.value.push(value);
}

const knowledgesContainerElement = ref(null);
const { y } = useElementBounding(knowledgesContainerElement);

const knowledgeElements = ref(null);

const knowledgeElementsBounding = computed(() => {
	if (knowledgeElements.value && knowledgeElements.value.length) {
		return Array.from(knowledgeElements.value).map(knowledgeElement => useElementBounding(knowledgeElement));
	} else {
		return null;
	}
});

const currentElementIndex = computed(() => {
	if (knowledgeElementsBounding.value && knowledgeElementsBounding.value.length) {
		return knowledgeElementsBounding.value.findIndex(knowledgeElementBounding => knowledgeElementBounding.top.value <= y.value && y.value < knowledgeElementBounding.bottom.value);
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
