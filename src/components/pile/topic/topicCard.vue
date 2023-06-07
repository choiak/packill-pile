<template>
	<div
		class='rounded-lg border p-4 flex items-start space-x-4 bg-white hover:brightness-95 active:scale-95 transition'
		:class='{"bg-gradient-to-br from-": accent}'
	>
		<div class='rounded-full border border-blue-600 bg-white p-2 w-fit'>
			<DocumentTextIcon class='h-4 w-4' />
		</div>
		<div class='space-y-2 flex-1'>
			<div class='space-y-1'>
				<h5 class='font-semibold'>{{ title }}</h5>
				<div class='flex items-center space-x-1'>
					<div v-for='area in areas'>
						<div
							class='rounded border px-1 text-xs font-medium text-neutral-500 bg-white'
						>
							{{ area?.attributes?.name }}
						</div>
					</div>
				</div>
			</div>
			<div>
				<p class='text-neutral-500 text-xs font-medium'>This topic includes:</p>
				<ol class='list-decimal'>
					<li v-for='knowledge in knowledges' class='marker:font-medium'>
						<div class='flex items-center justify-between'>
							<VenustTooltip>
								<template #reference>
									<p class='font-medium underline decoration-dashed underline-offset-2 decoration-1'>{{ knowledge.attributes.title
										}}</p>
								</template>
								<template #tooltip>
									{{ knowledge.attributes.purpose }}
								</template>
							</VenustTooltip>
							<div
								class='rounded border px-1 text-xs font-medium text-white bg-orange-600 border-orange-600'
								v-if='knowledge.attributes.type'>
								<p>{{ knowledge.attributes.type }}</p>
							</div>
						</div>
					</li>
				</ol>
			</div>
		</div>
	</div>
</template>

<script setup>
import { DocumentTextIcon } from '@heroicons/vue/24/outline/index.js';
import { computed, watch } from 'vue';
import { getTopic } from '@/api/topic.js';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';

const props = defineProps({
	topicId: Number,
	accent: Boolean,
});

const propTopicId = computed(() => {
	return props.topicId;
});

const topicResponse = getTopic(propTopicId, {
	populate: {
		areas: true,
		knowledges: {
			fields: ['type', 'purpose', 'title'],
		},
	},
}, { immediate: false });

if (propTopicId.value) {
	topicResponse.execute();
}

watch(propTopicId, (newTopicId) => {
	if (newTopicId) {
		topicResponse.execute();
	}
});

const topic = computed(() => {
	return topicResponse.data.value?.data?.attributes;
});

const title = computed(() => {
	return topic.value?.title;
});

const areas = computed(() => {
	return topic.value?.areas?.data;
});
const knowledges = computed(() => {
	return topic.value?.knowledges?.data;
});
</script>