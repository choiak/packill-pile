<template>
	<div
		class='relative rounded-lg border p-4 flex items-start space-x-4 bg-white hover:brightness-95 active:scale-95 transition'
	>
		<div class='rounded-full border border-blue-600 bg-white p-2 w-fit'>
			<BookOpenIcon class='h-4 w-4' />
		</div>
		<div class='space-y-2 flex-1'>
			<div class='space-y-1'>
				<h6 class='font-semibold font-display text-neutral-700'>{{ title }}</h6>
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
				<ol>
					<li v-for='knowledge in knowledges' class='rounded'>
						<div class='flex items-center justify-between'>
							<VenustTooltip>
								<template #reference>
									<p class='font-medium text-sm underline underline-offset-2 decoration-dashed decoration-1 decoration-orange-800 '>{{ knowledge.attributes.title
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
import { BookOpenIcon } from '@heroicons/vue/24/outline/index.js';
import { computed, watch } from 'vue';
import { getTopic } from '@/api/topic.js';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';

const props = defineProps({
	topicId: Number,
});

const propTopicId = computed(() => {
	return props.topicId;
});

const topicResponse = getTopic(propTopicId, {
	fields: ['title'],
	populate: {
		areas: {
			fields: ['name', 'primaryColor', 'secondaryColor']
		},
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