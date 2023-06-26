<template>
	<Activity>
		<template #icon>
			<DocumentIcon class="h-4 w-4" />
		</template>
		<template #message>
			{{
				$t('activity.quizCompleteMessage', {
					displayName: displayName,
					quizName: name,
				})
			}}
		</template>
		<template #createdAtDate>{{ createdAtDateString }}</template>
		<template #createdAtTime>{{ createdAtTimeString }}</template>
		<template #details>
			<router-link
				:to="`/quizzes/${quizId}`"
				class="flex w-fit items-center space-x-2 rounded-lg border bg-white p-2 hover:text-sky-800 hover:underline"
			>
				<DocumentIcon class="h-4 w-4 text-rose-600" />
				<p class="text-sm font-semibold">{{ name }}</p>
				<ArrowUpRightIcon class="h-3 w-3" />
			</router-link>
		</template>
	</Activity>
</template>

<script setup>
import {
	ArrowUpRightIcon,
	DocumentIcon,
} from '@heroicons/vue/24/outline/index.js';
import Activity from '@/layouts/activity/activity.vue';
import { computed, onUnmounted, toRefs, watch } from 'vue';
import { getActivity } from '@/api/activity.js';
import moment from 'moment';

const props = defineProps({
	activityId: Number,
});

const { activityId } = toRefs(props);

const activityResponse = getActivity(
	activityId,
	{
		populate: {
			target: {
				populate: {
					quiz: {
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

const quizId = computed(() => {
	return target.value?.quiz?.data?.id;
});

const quiz = computed(() => {
	return target.value?.quiz?.data?.attributes;
});

const name = computed(() => {
	return quiz.value?.name;
});

onUnmounted(() => {
	if (activityResponse.canAbort.value) {
		activityResponse.abort();
	}
});
</script>
