<template>
	<div class="space-y-8">
		<div class="flex items-start justify-between">
			<div class="flex items-start space-x-4">
				<div class="rounded-full border border-blue-600 bg-white p-2">
					<LightBulbIcon class="h-4 w-4" />
				</div>
				<div class="flex w-full items-center justify-between">
					<div class="space-y-1">
						<h5 class="font-semibold text-neutral-700">
							{{ title }}
						</h5>
						<div class="flex items-center space-x-1">
							<VenustTag
								v-for="area in areas"
								class="border"
								:style="{
									color: area.primaryColor,
									background: area.secondaryColor,
									borderColor: area.primaryColor,
								}"
							>
								{{ area.name }}
							</VenustTag>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="w-full space-y-4 rounded-lg border bg-neutral-100 px-4 py-2"
		>
			<div
				class="w-fit rounded border border-orange-600 bg-orange-600 px-1 text-xs font-medium text-white"
				v-if="type"
			>
				<p>{{ type }}</p>
			</div>
			<div class="space-y-1">
				<div class="flex items-center space-x-2">
					<div
						class="w-fit rounded border px-1 text-xs font-medium text-neutral-500"
					>
						BY
					</div>
					<p class="font-bold">{{ authorDisplayName }}</p>
				</div>
				<p class="text-sm text-neutral-500">
					Published at
					<span class="font-medium">
						{{ publishedAtString }}
					</span>
				</p>
			</div>
			<div class="space-y-1">
				<div class="flex items-center justify-between">
					<p class="text-xs font-bold uppercase text-neutral-500">
						This knowledge is about
					</p>
					<FireIcon class="h-4 w-4 text-neutral-500" />
				</div>
				<p class="text-justify text-sm font-medium text-neutral-500">
					{{ purpose }}
				</p>
			</div>
		</div>
		<div class="space-y-2">
			<div class="flex items-center justify-between">
				<p class="text-sm font-bold uppercase text-neutral-500">
					Content
				</p>
			</div>
			<div
				v-html="content"
				class="prose-article w-full text-justify font-text"
			/>
		</div>
	</div>
</template>

<script setup>
import { LightBulbIcon, FireIcon } from '@heroicons/vue/24/outline/index.js';
import VenustTag from '@/components/venust/tag/venustTag.vue';
import { computed } from 'vue';

const props = defineProps({
	knowledgeObject: Object,
});

const title = computed(() => {
	return props.knowledgeObject.title;
});
console.log(props.knowledgeObject);
const areas = computed(() => {
	return props.knowledgeObject.areas;
});

const type = computed(() => {
	return props.knowledgeObject.type;
});

const purpose = computed(() => {
	return props.knowledgeObject.purpose;
});

const content = computed(() => {
	return props.knowledgeObject.content;
});

const author = computed(() => {
	return props.knowledgeObject.author;
});

const authorDisplayName = computed(() => {
	return author.value.displayName;
});

const publishedAtString = computed(() => {
	return new Date(props.knowledgeObject.publishedAt).toLocaleString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	});
});
</script>
