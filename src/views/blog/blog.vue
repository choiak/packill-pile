<template>
	<Index>
		<div class="flex h-full flex-col">
			<Dock>
				<div>
					<h5 class="font-medium">{{ $t('announcement.blog') }}</h5>
					<p class="text-sm">
						All the latest Packill news, directly from our team.
					</p>
				</div>
			</Dock>
			<div class="flex-1 snap-y overflow-auto">
				<router-link
					class="relative block h-full w-full snap-start snap-always overflow-hidden"
					:to="`/blog/${latestAnnouncementId}`"
				>
					<img
						:src="latestAnnouncementCoverUrlFull"
						class="h-full w-full object-cover object-center"
					/>
					<div
						class="absolute left-0 top-0 flex h-full w-full flex-col justify-between p-8"
					>
						<h5 class="ml-auto font-medium text-white">
							{{ latestAnnouncementPublishedAtDateString }}
						</h5>
						<div class="space-y-2">
							<p class="font-medium text-white">
								{{ latestAnnouncementLead }}
							</p>
							<h3 class="font-display font-semibold text-white">
								{{ latestAnnouncementTitle }}
							</h3>
							<div
								class="flex items-center justify-center space-x-2"
							>
								<ChevronDownIcon
									class="h-6 w-6 animate-bounce stroke-2 text-white"
								/>
								<div
									class="w-fit rounded border border-white px-1 text-xs font-medium text-white"
								>
									Scroll
								</div>
							</div>
						</div>
					</div>
				</router-link>
				<div class="flex snap-start snap-always flex-col items-center">
					<div class="space-y-8 px-4 py-16 md:px-8">
						<h4
							class="relative ml-auto mr-auto w-fit text-center font-bold before:absolute before:-bottom-2 before:left-1/2 before:h-1 before:w-4 before:-translate-x-1/2 before:rounded-full before:bg-blue-600 lg:ml-0 lg:mr-0 lg:text-left"
						>
							{{ $t('announcement.allAnnouncements') }}
						</h4>
						<div
							class="max-w-[1600px] space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:grid-cols-3"
						>
							<router-link
								v-for="announcement in announcements"
								:to="`/blog/${announcement.id}`"
							>
								<AnnouncementCard
									:announcement-id="announcement.id"
								/>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline/index.js';
import Index from '@/layouts/utils/index.vue';
import Dock from '@/layouts/dock/dock.vue';
import { getAnnouncements } from '@/api/announcement.js';
import { computed } from 'vue';
import { useInfoStore } from '@/store/info.js';
import moment from 'moment';
import AnnouncementCard from '@/layouts/announcement/announcementCard.vue';

const infoStore = useInfoStore();

const announcementsResponse = getAnnouncements({
	sort: ['publishedAt:desc'],
	populate: ['cover'],
});

const announcements = computed(() => {
	return announcementsResponse.data.value?.data;
});

const latestAnnouncement = computed(() => {
	if (announcements.value) {
		return announcements.value[0].attributes;
	}
});

const latestAnnouncementId = computed(() => {
	if (announcements.value) {
		return announcements.value[0].id;
	}
});

const latestAnnouncementTitle = computed(() => {
	return latestAnnouncement.value?.title;
});

const latestAnnouncementLead = computed(() => {
	return latestAnnouncement.value?.lead;
});

const latestAnnouncementPublishedAt = computed(() => {
	return new Date(latestAnnouncement.value?.publishedAt);
});

const latestAnnouncementPublishedAtDateString = computed(() => {
	return moment(latestAnnouncementPublishedAt.value).format('L');
});

const latestAnnouncementCover = computed(() => {
	return latestAnnouncement.value?.cover?.data?.attributes;
});

const latestAnnouncementCoverUrl = computed(() => {
	return latestAnnouncementCover.value?.url;
});

const latestAnnouncementCoverUrlFull = computed(() => {
	if (latestAnnouncementCoverUrl.value) {
		return infoStore.url.strapi + latestAnnouncementCoverUrl.value;
	}
});
</script>
