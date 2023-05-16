<template>
	<Index>
		<div class='flex h-full flex-col'>
			<Dock>
				<div>
					<h5 class='font-medium'>Blog</h5>
					<p class='text-sm'>
						All the latest Packill news, directly from our team.
					</p>
				</div>
			</Dock>
			<div class='flex flex-1 justify-center overflow-auto space-x-16'>
				<transition name='fade' mode='out-in'>
					<div class='max-w-[768px] space-y-16 py-8' v-if='isLoading'>
						<div class='animate-pulse bg-slate-200 rounded w-[768px] h-24' />
						<div class='flex items-center space-x-4'>
							<div
								class='animate-pulse w-1 self-stretch bg-gradient-to-b from-blue-600 to-violet-600 rounded' />
							<div class='animate-pulse bg-slate-200 rounded w-full h-16' />
						</div>
						<div class='space-y-5'>
							<div class='animate-pulse bg-slate-200 rounded w-full h-72' />
							<div class='animate-pulse bg-slate-200 rounded w-full h-96' />
						</div>
					</div>
					<div class='max-w-[768px] space-y-16 py-8' v-else>
						<h2 class='font-bold font-display'>{{ title }}</h2>
						<div class='flex items-center space-x-4' v-if='lead'>
							<div class='w-2 self-stretch bg-gradient-to-b from-blue-600 to-violet-600 rounded' />
							<h4>{{ lead }}</h4>
						</div>
						<div
							v-html='content'
							class='prose-article font-text first-letter:text-4xl'
						/>
					</div>
				</transition>
				<div class='py-8 space-y-8'>
					<transition name='fade' mode='out-in'>
						<div v-if='isLoading' class='space-y-2'>
							<div class='animate-pulse bg-neutral-200 rounded w-12 h-5' />
							<div class='animate-pulse bg-slate-200 rounded w-32 h-10' />
						</div>
						<div class='space-y-2' v-else-if='series'>
							<div
								class='rounded border px-1 text-xs font-medium text-neutral-500 w-fit'
							>
								Series
							</div>
							<h3 class='capitalize font-display'>{{ series }}</h3>
						</div>
					</transition>
					<transition name='fade' mode='out-in'>
						<div
							class='rounded-xl w-[512px] h-[768px] bg-gradient-to-br from-fuchsia-200 to-blue-200 animate-pulse'
							v-if='isLoading' />
						<div class='rounded-xl w-[512px] h-[768px] overflow-hidden' v-else-if='cover'>
							<img :src='coverUrlFull' :alt='title' class='object-cover h-full w-full object-center'>
						</div>
					</transition>
					<div class='flex items-start space-x-32'>
						<transition name='fade' mode='out-in'>
							<div v-if='isLoading' class='space-y-2'>
								<div class='animate-pulse bg-neutral-200 rounded w-12 h-5' />
								<div class='animate-pulse bg-slate-200 rounded w-16 h-6' />
							</div>
							<div class='space-y-2' v-else>
								<div
									class='rounded border px-1 text-xs font-medium text-neutral-500 w-fit'
								>
									Written By
								</div>
								<p class='font-bold'>{{ authorDisplayName }}</p>
							</div>
						</transition>
						<transition name='fade' mode='out-in'>
							<div v-if='isLoading' class='space-y-2'>
								<div class='animate-pulse bg-neutral-200 rounded w-12 h-5' />
								<div class='animate-pulse bg-slate-200 rounded w-32 h-6' />
							</div>
							<div class='space-y-2' v-else>
								<div
									class='rounded border px-1 text-xs font-medium text-neutral-500 w-fit'
								>
									Published on
								</div>
								<p class='font-bold'>{{ publishedAtString }}</p>
							</div>
						</transition>
					</div>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import Dock from '@/layouts/dock/dock.vue';
import Index from '@/layouts/utils/index.vue';
import { getAnnouncement } from '@/api/announcement.js';
import { computed, onUnmounted, watch } from 'vue';
import moment from 'moment';
import { useRoute } from 'vue-router';
import { useInfoStore } from '@/store/index.js';

const infoStore = useInfoStore();

const route = useRoute();
const paramAnnouncementId = computed(() => {
	return route.params.announcementId || null;
});

const announcementResponse = getAnnouncement(paramAnnouncementId, {
	populate: {
		author: true,
		cover: true,
	},
}, { immediate: false });

if (paramAnnouncementId.value) {
	announcementResponse.execute();
}

watch(paramAnnouncementId, (newAnnouncementId) => {
	if (newAnnouncementId) {
		announcementResponse.execute();
	}
});

const isLoading = computed(() => {
	return announcementResponse.isFetching.value || (!announcementResponse.isFetching.value && !announcementResponse.isFinished.value) || !paramAnnouncementId.value;
});

const announcement = computed(() => {
	return announcementResponse.data.value?.data?.attributes;
});

const title = computed(() => {
	return announcement.value?.title;
});

const series = computed(() => {
	return announcement.value?.series;
});

const lead = computed(() => {
	return announcement.value?.lead;
});

const content = computed(() => {
	return announcement.value?.content;
});

const authorId = computed(() => {
	return announcement.value?.author?.data?.id;
});

const author = computed(() => {
	return announcement.value?.author?.data?.attributes;
});

const authorDisplayName = computed(() => {
	return author.value?.displayName;
});


const cover = computed(() => {
	return announcement.value?.cover?.data?.attributes;
});

const coverUrl = computed(() => {
	return cover.value?.url;
});

const coverUrlFull = computed(() => {
	if (coverUrl.value) {
		return infoStore.url.strapi + coverUrl.value;
	}
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

onUnmounted(() => {
	if (announcementResponse.canAbort.value) {
		announcementResponse.abort();
	}
});
</script>
