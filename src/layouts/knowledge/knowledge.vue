<template>
	<div
		class='flex flex-col items-center space-y-4'
	>
		<div class='flex w-full items-center justify-between space-x-4'>
			<div class='space-y-2'>
				<h5
					class='w-fit rounded-lg bg-blue-600 px-2 font-semibold uppercase tracking-widest text-white'
				>
					{{ order + 1 }}. {{ title }}
				</h5>
				<div class='flex items-center space-x-1'>
					<div v-for='area in areas'>
						<div
							class='rounded border px-1 text-xs font-medium text-neutral-500'
						>
							{{ area?.attributes?.name }}
						</div>
					</div>
				</div>
			</div>
			<ProfileCard :user-id='authorId'>
				<div class='flex flex-col items-end space-y-1 text-right'>
					<div class='flex items-center space-x-2'>
						<div
							class='rounded border px-1 text-xs font-medium text-neutral-500 w-fit'
						>
							BY
						</div>
						<p class='font-bold'>{{ authorDisplayName }}</p>
					</div>
					<p class='text-sm text-neutral-500'>
						Published on
						<span class='font-medium'>
							{{ publishedAtString }}
						</span>
					</p>
				</div>
			</ProfileCard>
		</div>
		<div
			v-html='content'
			class='prose-article w-full text-justify font-text'
		/>
	</div>
</template>

<script setup>
import 'highlight.js/styles/a11y-dark.css';
import { computed, onUnmounted } from 'vue';
import { getKnowledge } from '@/api/knowledge.js';
import ProfileCard from '@/layouts/user/profileCard.vue';

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
	return knowledgeResponse.data.value?.data?.attributes;
});

const title = computed(() => {
	return knowledge.value?.title;
});

const areas = computed(() => {
	return knowledge.value?.areas?.data;
});

const content = computed(() => {
	return knowledge.value?.content;
});

const authorId = computed(() => {
	return knowledge.value?.author?.data?.id;
});

const author = computed(() => {
	return knowledge.value?.author?.data?.attributes;
});

const authorDisplayName = computed(() => {
	return author.value?.displayName;
});

const publishedAtString = computed(() => {
	return new Date(knowledge?.value?.publishedAt).toLocaleString('en-GB', {
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
