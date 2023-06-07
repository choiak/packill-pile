<template>
	<div>
		<component v-for='activity in activities' :activity-id='activity.id' :is='getActivityComponent(activity.attributes.type)'/>
	</div>
</template>

<script setup>
import { getActivities } from '@/api/activity.js';
import { computed, onUnmounted, watch } from 'vue';
import activityProblemComplete from '@/layouts/activity/activityProblemComplete.vue';
import activityUserJoin from '@/layouts/activity/activityUserJoin.vue';
import activityTopicComplete from '@/layouts/activity/activityTopicComplete.vue';
import activityKnowledgePublish from '@/layouts/activity/activityKnowledgePublish.vue';
import activityPackageComplete from '@/layouts/activity/activityPackageComplete.vue';

const props = defineProps({
	userId: Number,
});

const propUserId = computed(() => {
	return props.userId;
});

const query = computed(() => {
	return {
		fields: ['id', 'type'],
		sort: ['id:desc'],
		filters: {
			user: propUserId.value
		}
	}
});

const activitiesResponse = getActivities(query, { immediate: false });

if (propUserId.value) {
	activitiesResponse.execute();
}

watch(propUserId, (newUserId) => {
	if (newUserId) {
		activitiesResponse.execute();
	}
});

const activities = computed(() => {
	return activitiesResponse.data.value?.data;
});
console.log(activities);
function getActivityComponent(type) {
	switch(type){
		case 'user-join':
			return activityUserJoin;
		case 'knowledge-publish':
			return activityKnowledgePublish;
		case 'problem-complete':
			return activityProblemComplete;
		case 'topic-complete':
			return activityTopicComplete;
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
