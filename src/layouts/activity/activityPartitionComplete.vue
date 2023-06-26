<template>
	<Activity>
		<template #icon>
			<Square2StackIcon class='h-4 w-4' />
		</template>
		<template #message>
			{{ $t('activity.partitionCompleteMessage', { displayName: displayName, partitionName: name}) }}
		</template>
		<template #createdAtDate>{{ createdAtDateString }}</template>
		<template #createdAtTime>{{ createdAtTimeString }}</template>
		<template #details>
			<router-link :to='`/topics`' class='flex space-x-2 border rounded-lg bg-white p-2 w-fit items-center hover:underline hover:text-sky-800'>
				<Square2StackIcon class='text-emerald-600 w-4 h-4' />
				<p class='text-sm font-semibold'>{{ name }}</p>
				<ArrowUpRightIcon class='w-3 h-3'/>
			</router-link>
		</template>
	</Activity>
</template>

<script setup>

import { ArrowUpRightIcon, Square2StackIcon } from '@heroicons/vue/24/outline/index.js';
import Activity from '@/layouts/activity/activity.vue';
import { computed, onUnmounted, toRefs, watch } from 'vue';
import { getActivity } from '@/api/activity.js';
import moment from 'moment';

const props = defineProps({
	activityId: Number,
})

const { activityId } = toRefs(props);

const activityResponse = getActivity(activityId, {
	populate: {
		target: {
			populate: {
				partition: {
					fields: ['id', 'name'],
				},
			},
		},
		user: {
			fields: ['id', 'displayName'],
		},
	},
}, { immediate: false });

if (activityId.value) {
	activityResponse.execute();
}

watch(activityId, (newActivityId) => {
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

const partitionId = computed(() => {
	return  target.value?.partition?.data?.id;
})

const partition = computed(() => {
	return target.value?.partition?.data?.attributes;
});

const name = computed(() => {
	return partition.value?.name;
});

onUnmounted(() => {
	if (activityResponse.canAbort.value) {
		activityResponse.abort();
	}
});
</script>
