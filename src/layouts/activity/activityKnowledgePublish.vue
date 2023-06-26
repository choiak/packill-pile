<template>
	<Activity>
		<template #icon>
			<DocumentArrowUpIcon class="h-4 w-4" />
		</template>
		<template #message>
			{{
				$t('activity.knowledgePublishMessage', {
					displayName: displayName,
					title: title,
				})
			}}
		</template>
		<template #createdAtDate>{{ createdAtDateString }}</template>
		<template #createdAtTime>{{ createdAtTimeString }}</template>
		<template #details>
			<router-link
				:to="`/workspace/`"
				class="flex w-fit items-center space-x-2 rounded-lg border bg-white p-2 hover:text-sky-800 hover:underline"
			>
				<DocumentArrowUpIcon class="h-4 w-4 text-blue-600" />
				<p class="text-sm font-semibold">{{ title }}</p>
				<ArrowUpRightIcon class="h-3 w-3" />
			</router-link>
		</template>
	</Activity>
</template>

<script setup>
import Activity from '@/layouts/activity/activity.vue';
import {
	ArrowUpRightIcon,
	DocumentArrowUpIcon,
} from '@heroicons/vue/24/outline/index.js';
import { computed, onUnmounted, watch } from 'vue';
import { getActivity } from '@/api/activity.js';
import moment from 'moment';

const props = defineProps({
	activityId: Number,
});

const propActivityId = computed(() => {
	return props.activityId;
});

const activityResponse = getActivity(
	propActivityId,
	{
		populate: {
			target: {
				populate: {
					knowledge: {
						fields: ['id', 'title'],
					},
				},
			},
			user: {
				fields: ['id', 'displayName'],
			},
		},
	},
	{ immediate: false },
);

if (propActivityId.value) {
	activityResponse.execute();
}

watch(propActivityId, (newActivityId) => {
	if (newActivityId) {
		activityResponse.execute();
	}
});

const activity = computed(() => {
	return activityResponse.data.value?.data?.attributes;
});

const createdAt = computed(() => {
	return new Date(activity.value?.createdAt);
});

const createdAtDateString = computed(() => {
	return moment(createdAt.value).format('L');
});

const createdAtTimeString = computed(() => {
	return moment(createdAt.value).format('LT');
});

const user = computed(() => {
	return activity.value?.user?.data?.attributes;
});

const displayName = computed(() => {
	return user.value?.displayName;
});

const target = computed(() => {
	if (activity.value?.target) {
		return activity.value?.target[0];
	}
});

const knowledge = computed(() => {
	return target.value?.knowledge?.data?.attributes;
});

const title = computed(() => {
	return knowledge.value?.title;
});

onUnmounted(() => {
	if (activityResponse.canAbort.value) {
		activityResponse.abort();
	}
});
</script>
