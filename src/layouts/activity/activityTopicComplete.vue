<template>
	<Activity>
		<template #icon>
			<BookOpenIcon class='h-4 w-4' />
		</template>
		<template #message>
			{{ $t('activity.topicCompleteMessage', { displayName: displayName, title: title}) }}
		</template>
		<template #createdAtDate>{{ createdAtDateString }}</template>
		<template #createdAtTime>{{ createdAtTimeString }}</template>
		<template #details>
			<router-link :to='`/workspace/${topicId}`' class='flex space-x-2 border rounded-lg bg-white p-2 w-fit items-center hover:underline hover:text-sky-800'>
				<BookOpenIcon class='text-orange-600 w-4 h-4' />
				<p class='text-sm font-semibold'>{{ title }}</p>
				<ArrowUpRightIcon class='w-3 h-3'/>
			</router-link>
		</template>
	</Activity>
</template>

<script setup>
import Activity from '@/layouts/activity/activity.vue';
import { ArrowUpRightIcon, BookOpenIcon } from '@heroicons/vue/24/outline/index.js';
import { computed, onUnmounted, watch } from 'vue';
import { getActivity } from '@/api/activity.js';
import moment from 'moment';

const props = defineProps({
	activityId: Number,
});

const propActivityId = computed(() => {
	return props.activityId;
});

const activityResponse = getActivity(propActivityId, {
	populate: {
		target: {
			populate: {
				topic: {
					fields: ['id', 'title'],
				},
			},
		},
		user: {
			fields: ['id', 'displayName'],
		},
	},
}, { immediate: false });

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

const topicId = computed(() => {
	return  target.value?.topic?.data?.id;
})

const topic = computed(() => {
	return target.value?.topic?.data?.attributes;
});

const title = computed(() => {
	return topic.value?.title;
});

onUnmounted(() => {
	if (activityResponse.canAbort.value) {
		activityResponse.abort();
	}
});
</script>
