<template>
	<VenustCard>
		<div class='space-y-4'>
			<p class='font-display capitalize'>{{ series }}</p>
			<h6 class='font-display font-semibold leading-5'>{{ title }}</h6>
			<p class='line-clamp-3 text-neutral-700 leading-5'>{{ lead }}</p>
			<div class='flex items-baseline justify-between'>
				<p class='text-xs text-neutral-700'>{{ authorDisplayName }}</p>
				<p class='text-xs text-neutral-700'>{{ publishedAtString }}</p>
			</div>
		</div>
	</VenustCard>
</template>

<script setup>
import { getAnnouncement } from '@/api/announcement.js';
import { computed, toRef, watch } from 'vue';
import VenustCard from '@/components/venust/card/venustCard.vue';
import moment from 'moment';

const props = defineProps({
	announcementId: Number,
});

const announcementId = toRef(props, 'announcementId');

const announcementResponse = getAnnouncement(announcementId, { populate: ['author'] }, { immediate: false });

if (announcementId.value) {
	announcementResponse.execute();
}

watch(announcementId, (newAnnouncementId) => {
	if (newAnnouncementId) {
		announcementResponse.execute();
	}
});

const announcement = computed(() => {
	return announcementResponse.data.value?.data?.attributes;
});

const title = computed(() => {
	return announcement.value?.title;
});

const lead = computed(() => {
	return announcement.value?.lead;
});

const series = computed(() => {
	return announcement.value?.series;
});

const author = computed(() => {
	return announcement.value?.author?.data?.attributes;
});

const authorDisplayName = computed(() => {
	return author.value?.displayName;
});

const publishedAt = computed(() => {
	if (announcement?.value?.publishedAt) {
		return new Date(announcement?.value?.publishedAt);
	}
});

const publishedAtString = computed(() => {
	if (publishedAt.value) {
		return moment(publishedAt.value).format('L');
	}
});
</script>
