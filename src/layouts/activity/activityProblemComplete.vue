<template>
	<Activity>
		<template #icon>
			<PencilIcon class='h-4 w-4' />
		</template>
		<template #message>
			{{ $t('activity.problemCompleteMessage', { displayName: displayName, problemName: problemName }) }}
		</template>
		<template #createdAtDate>{{ createdAtDateString }}</template>
		<template #createdAtTime>{{ createdAtTimeString }}</template>
		<template #details>
			<router-link to='' class='flex space-x-2 border rounded-lg bg-white p-2 w-fit items-center hover:underline hover:text-sky-800'>
				<PencilIcon class='text-violet-600 w-4 h-4'/>
				<p class='text-sm font-semibold'>{{ problemName }}</p>
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
import { PencilIcon, ArrowUpRightIcon } from '@heroicons/vue/24/outline/index.js';

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
				problem: {
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

const problem = computed(() => {
	return target.value?.problem?.data?.attributes;
});

const problemName = computed(() => {
	return problem.value?.name;
});
console.log(problem)
onUnmounted(() => {
	if (activityResponse.canAbort.value) {
		activityResponse.abort();
	}
});
</script>