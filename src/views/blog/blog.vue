<template>
	<Index>
		<div class='flex h-full flex-col'>
			<Dock>
				<div>
					<h5 class='font-medium'>{{ $t('announcement.blog') }}</h5>
					<p class='text-sm'>
						All the latest Packill news, directly from our team.
					</p>
				</div>
			</Dock>
			<div class='flex-1 overflow-auto snap-y'>
				<router-link class='block relative h-full w-full overflow-hidden snap-start snap-always'
							 :to='`/blog/${latestAnnouncementId}`'>
					<img :src='latestAnnouncementCoverUrlFull' class='object-cover h-full w-full object-center'>
					<div class='absolute w-full h-full left-0 top-0 p-8 flex flex-col justify-between'>
						<h5 class='text-white font-medium ml-auto'>
							{{ latestAnnouncementPublishedAtDateString }}
						</h5>
						<div class='space-y-2'>
							<p class='text-white font-medium'>{{ latestAnnouncementLead }}</p>
							<h3 class='text-white font-display font-semibold'>{{ latestAnnouncementTitle }}</h3>
							<div class='flex items-center justify-center space-x-2'>
								<ChevronDownIcon class='h-6 w-6 text-white animate-bounce stroke-2' />
								<div
									class='w-fit rounded border border-white px-1 text-xs font-medium text-white'
								>
									Scroll
								</div>
							</div>
						</div>
					</div>
				</router-link>
				<div class='flex flex-col items-center snap-start snap-always'>
					<div class='px-4 md:px-8 space-y-8 py-16'>
						<h4 class='ml-auto mr-auto text-center lg:text-left lg:ml-0 lg:mr-0 font-bold relative before:absolute before:-bottom-2 before:left-1/2 before:h-1 before:w-4 before:-translate-x-1/2 before:rounded-full before:bg-blue-600 w-fit'>
							{{ $t('announcement.allAnnouncements') }}</h4>
						<div
							class='space-y-4 lg:space-y-0 max-w-[1600px] lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4'>
							<router-link v-for='announcement in announcements' :to='`/blog/${announcement.id}`'>
								<AnnouncementCard :announcement-id='announcement.id' />
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
