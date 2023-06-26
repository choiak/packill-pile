<template>
	<div>
		<component
			v-for="activity in activities"
			:activity-id="activity.id"
			:is="getActivityComponent(activity.attributes.type)"
			class="w-full"
		/>
	</div>
</template>

<script setup>
import { getActivities } from '@/api/activity.js';
import { computed, onUnmounted, toRefs, watch } from 'vue';
import activityProblemComplete from '@/layouts/activity/activityProblemComplete.vue';
import activityUserJoin from '@/layouts/activity/activityUserJoin.vue';
import activityTopicComplete from '@/layouts/activity/activityTopicComplete.vue';
import activityKnowledgePublish from '@/layouts/activity/activityKnowledgePublish.vue';
import activityPackageComplete from '@/layouts/activity/activityPackageComplete.vue';
import activityQuizComplete from '@/layouts/activity/activityQuizComplete.vue';
import activityPartitionComplete from '@/layouts/activity/activityPartitionComplete.vue';

const props = defineProps({
	userId: Number,
	pageSize: Number,
});

const { userId, pageSize } = toRefs(props);

const query = computed(() => {
	return {
		fields: ['id', 'type'],
		sort: ['id:desc'],
		filters: {
			user: userId.value,
		},
		pagination: {
			pageSize: pageSize.value,
		},
	};
});

const activitiesResponse = getActivities(query, { immediate: false });

if (userId.value) {
	activitiesResponse.execute();
}

watch(userId, (newUserId) => {
	if (newUserId) {
		activitiesResponse.execute();
	}
});

const activities = computed(() => {
	return activitiesResponse.data.value?.data;
});

function getActivityComponent(type) {
	switch (type) {
		case 'user-join':
			return activityUserJoin;
		case 'knowledge-publish':
			return activityKnowledgePublish;
		case 'problem-complete':
			return activityProblemComplete;
		case 'topic-complete':
			return activityTopicComplete;
		case 'quiz-complete':
			return activityQuizComplete;
		case 'partition-complete':
			return activityPartitionComplete;
		case 'package-complete':
			return activityPackageComplete;
		default:
			return null;
	}
}

onUnmounted(() => {
	if (activitiesResponse.canAbort.value) {
		activitiesResponse.abort();
	}
});
</script>
