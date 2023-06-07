<template>
	<Activity>
		<template #icon>
			<Square3Stack3DIcon class='h-4 w-4' />
		</template>
		<template #message>
			{{ $t('activity.packageCompleteMessage', { displayName: displayName, packageName: packageName }) }}
		</template>
		<template #createdAtDate>{{ createdAtDateString }}</template>
		<template #createdAtTime>{{ createdAtTimeString }}</template>
		<template #details>
			<router-link to='' class='flex space-x-2 border rounded-lg bg-white p-2 w-fit items-center hover:underline hover:text-sky-800'>
				<Square3Stack3DIcon class='text-teal-600 w-4 h-4'/>
				<p class='text-sm font-semibold'>{{ packageName }}</p>
				<ArrowUpRightIcon class='w-3 h-3'/>
			</router-link>
		</template>
	</Activity>
</template>

<script setup>
import Activity from '@/layouts/activity/activity.vue';
import { computed, onUnmounted, watch } from 'vue';
import { getActivity } from '@/api/activity.js';
import moment from 'moment';
import { Square3Stack3DIcon, ArrowUpRightIcon } from '@heroicons/vue/24/outline/index.js';

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
				package: {
					fields: ['id', 'name'],
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

const pack = computed(() => {
	return target.value?.package?.data?.attributes;
});

const packageName = computed(() => {
	return pack.value?.name;
});

onUnmounted(() => {
	if (activityResponse.canAbort.value) {
		activityResponse.abort();
	}
});
</script>