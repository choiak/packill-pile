<template>
	<Activity>
		<template #icon>
			<SparklesIcon class="h-4 w-4" />
		</template>
		<template #message>
			{{ $t('activity.userJoinMessage', { displayName: displayName }) }}
		</template>
		<template #createdAtDate>{{ createdAtDateString }}</template>
		<template #createdAtTime>{{ createdAtTimeString }}</template>
	</Activity>
</template>

<script setup>
import { SparklesIcon } from '@heroicons/vue/24/outline/index.js';
import Activity from '@/layouts/activity/activity.vue';
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

onUnmounted(() => {
	if (activityResponse.canAbort.value) {
		activityResponse.abort();
	}
});
</script>
