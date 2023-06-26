<template>
	<Activity>
		<template #icon>
			<PencilIcon class="h-4 w-4" />
		</template>
		<template #message>
			{{
				$t('activity.problemCompleteMessage', {
					displayName: displayName,
					problemName: problemName,
				})
			}}
		</template>
		<template #createdAtDate>{{ createdAtDateString }}</template>
		<template #createdAtTime>{{ createdAtTimeString }}</template>
		<template #details>
			<router-link
				to=""
				class="flex w-fit items-center space-x-2 rounded-lg border bg-white p-2 hover:text-sky-800 hover:underline"
			>
				<PencilIcon class="h-4 w-4 text-violet-600" />
				<p class="text-sm font-semibold">{{ problemName }}</p>
				<ArrowUpRightIcon class="h-3 w-3" />
			</router-link>
		</template>
	</Activity>
</template>

<script setup>
import Activity from '@/layouts/activity/activity.vue';
import { computed, onUnmounted, watch } from 'vue';
import { getActivity } from '@/api/activity.js';
import moment from 'moment';
import {
	PencilIcon,
	ArrowUpRightIcon,
} from '@heroicons/vue/24/outline/index.js';

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
					problem: {
						fields: ['id', 'name'],
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

const problem = computed(() => {
	return target.value?.problem?.data?.attributes;
});

const problemName = computed(() => {
	return problem.value?.name;
});

onUnmounted(() => {
	if (activityResponse.canAbort.value) {
		activityResponse.abort();
	}
});
</script>
