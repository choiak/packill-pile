<template>
	<Index>
		<div class="flex h-full flex-col">
			<Dock>
				<div>
					<h5 class="font-medium">
						{{ $t('announcement.announcement') }}
					</h5>
					<p class="text-sm">
						All the latest Packill news, directly from our team.
					</p>
				</div>
			</Dock>
			<div class="flex flex-1 justify-center space-x-16 overflow-auto">
				<transition name="fade" mode="out-in">
					<div class="max-w-[768px] space-y-16 py-8" v-if="isLoading">
						<div
							class="h-24 w-[768px] animate-pulse rounded bg-slate-200"
						/>
						<div class="flex items-center space-x-4">
							<div
								class="w-1 animate-pulse self-stretch rounded bg-gradient-to-b from-blue-600 to-violet-600"
							/>
							<div
								class="h-16 w-full animate-pulse rounded bg-slate-200"
							/>
						</div>
						<div class="space-y-5">
							<div
								class="h-72 w-full animate-pulse rounded bg-slate-200"
							/>
							<div
								class="h-96 w-full animate-pulse rounded bg-slate-200"
							/>
						</div>
					</div>
					<div class="max-w-[768px] space-y-16 py-8" v-else>
						<h2 class="font-display font-bold">{{ title }}</h2>
						<div class="flex items-center space-x-4" v-if="lead">
							<div
								class="w-2 self-stretch rounded bg-gradient-to-b from-blue-600 to-violet-600"
							/>
							<h4>{{ lead }}</h4>
						</div>
						<div
							v-html="content"
							class="prose-article font-text first-letter:text-4xl"
						/>
					</div>
				</transition>
				<div class="space-y-8 py-8">
					<transition name="fade" mode="out-in">
						<div v-if="isLoading" class="space-y-2">
							<div
								class="h-5 w-12 animate-pulse rounded bg-neutral-200"
							/>
							<div
								class="h-10 w-32 animate-pulse rounded bg-slate-200"
							/>
						</div>
						<div class="space-y-2" v-else-if="series">
							<div
								class="w-fit rounded border px-1 text-xs font-medium text-neutral-500"
							>
								Series
							</div>
							<h3 class="font-display capitalize">
								{{ series }}
							</h3>
						</div>
					</transition>
					<transition name="fade" mode="out-in">
						<div
							class="h-[768px] w-[512px] animate-pulse rounded-xl bg-gradient-to-br from-fuchsia-200 to-blue-200"
							v-if="isLoading"
						/>
						<div
							class="h-[768px] w-[512px] overflow-hidden rounded-xl"
							v-else-if="cover"
						>
							<img
								:src="coverUrlFull"
								:alt="title"
								class="h-full w-full object-cover object-center"
							/>
						</div>
					</transition>
					<div class="flex items-start space-x-32">
						<transition name="fade" mode="out-in">
							<div v-if="isLoading" class="space-y-2">
								<div
									class="h-5 w-12 animate-pulse rounded bg-neutral-200"
								/>
								<div
									class="h-6 w-16 animate-pulse rounded bg-slate-200"
								/>
							</div>
							<div class="space-y-2" v-else>
								<div
									class="w-fit rounded border px-1 text-xs font-medium text-neutral-500"
								>
									Written By
								</div>
								<p class="font-bold">{{ authorDisplayName }}</p>
							</div>
						</transition>
						<transition name="fade" mode="out-in">
							<div v-if="isLoading" class="space-y-2">
								<div
									class="h-5 w-12 animate-pulse rounded bg-neutral-200"
								/>
								<div
									class="h-6 w-32 animate-pulse rounded bg-slate-200"
								/>
							</div>
							<div class="space-y-2" v-else>
								<div
									class="w-fit rounded border px-1 text-xs font-medium text-neutral-500"
								>
									Published on
								</div>
								<p class="font-bold">{{ publishedAtString }}</p>
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
import { useInfoStore } from '@/store/info.js';

const infoStore = useInfoStore();

const route = useRoute();
const paramAnnouncementId = computed(() => {
	return route.params.announcementId || null;
});

const announcementResponse = getAnnouncement(
	paramAnnouncementId,
	{
		populate: {
			author: true,
			cover: true,
		},
	},
	{ immediate: false },
);

if (paramAnnouncementId.value) {
	announcementResponse.execute();
}

watch(paramAnnouncementId, (newAnnouncementId) => {
	if (newAnnouncementId) {
		announcementResponse.execute();
	}
});

const isLoading = computed(() => {
	return (
		announcementResponse.isFetching.value ||
		(!announcementResponse.isFetching.value &&
			!announcementResponse.isFinished.value) ||
		!paramAnnouncementId.value
	);
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
