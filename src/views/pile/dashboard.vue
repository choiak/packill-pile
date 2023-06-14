<template>
	<Index>
		<div class='flex flex-col h-full'>
			<Dock>
				<div>
					<h5 class='font-medium'>{{ $t('dashboard.dashboard') }}</h5>
					<p class='text-sm'>{{ $t('dashboard.dashboardDescription') }}</p>
				</div>
			</Dock>
			<div
				class='w-full flex-1 p-8 flex space-x-8 overflow-auto'
			>
				<div class='flex flex-col space-y-24 w-[600px]'>
					<div class='space-y-4 rounded-lg relative'>
						<h2 class='text-neutral-300'>
							You have been
						</h2>
						<h2 class='font-bold'>
							learning on
						</h2>
						<h2 class='text-orange-600 italic'>Packill</h2>
						<div
							class='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-gradient-to-tr before:from-purple-300 before:to-pink-300 before:rounded-lg relative inline-block'>
							<h1 class='relative text-blue-600 font-black'>since {{ createdAtToNowString }}</h1>
						</div>
					</div>
					<div class='flex-1 flex flex-col space-y-4 overflow-auto'>
						<div class='flex space-x-2 items-center'>
							<h4 class='font-bold'>{{ $t('activity.recentActivities') }}</h4>
							<ChevronRightIcon class='h-5 w-5 text-blue-600 stroke-2' />
						</div>
						<Activities :user-id='Number(userStore.id)' class='flex-1 overflow-auto' />
					</div>
				</div>
				<div class='grid grid-cols-4 gap-4 w-[900px]'>
					<router-link
						class='flex flex-col justify-end rounded-xl col-span-2 row-span-2 bg-gradient-to-br from-blue-950 to-indigo-900 p-4 active:scale-95 hover:brightness-110 hover:shadow-xl hover:shadow-indigo-300 transition'
						to='/packages'>
						<div class='space-y-4'>
							<PlusIcon class='mt-auto h-6 w-6 text-white stroke-2' />
							<h6 class='text-white font-bold'>Unpack a new package</h6>
						</div>
					</router-link>
					<router-link
						class='block rounded-xl col-span-2 border relative h-full w-full overflow-hidden active:scale-95 hover:brightness-90 transition hover:shadow-xl'
						:to='`/blog/${latestAnnouncementId}`'>
						<img :src='latestAnnouncementCoverUrlFull' class='object-cover h-full w-full object-center'
							 :alt='latestAnnouncementTitle'>
						<div class='absolute w-full h-full left-0 top-0 p-4 flex flex-col justify-between'>
							<p class='text-white font-medium ml-auto'>
								{{ latestAnnouncementPublishedAtDateString }}
							</p>
							<div class='space-y-2'>
								<p class='text-white font-medium text-xs'>{{ latestAnnouncementLead }}</p>
								<h4 class='text-white font-display font-semibold'>{{ latestAnnouncementTitle }}</h4>
							</div>
						</div>
					</router-link>
					<div class='rounded-xl bg-white p-4 col-span-2 border'></div>
					<div
						class='flex flex-col bg-white border rounded-xl col-span-full overflow-hidden'
					>
						<div
							class='flex items-center justify-between border-b px-4 py-2'
						>
							<p class='text-sm font-bold uppercase text-neutral-500'>
								Statistics
							</p>
							<ChartBarIcon class='h-4 w-4 text-neutral-500' />
						</div>
						<div class='flex-1 flex divide-x'>
							<div class='flex flex-col divide-y p-8'>
								<div class='flex-1 flex flex-col justify-center'>
									<p class='text-neutral-500 font-medium text-sm'>Completed problems</p>
									<h4 class='font-display font-semibold'>{{ completedProblemsCount }}</h4>
								</div>
								<div class='flex-1 flex flex-col justify-center'>
									<p class='text-neutral-500 font-medium text-sm'>Completed topics</p>
									<h4 class='font-display font-semibold'>{{ completedTopicsCount }}</h4>
								</div>
								<div class='flex-1 flex flex-col justify-center'>
									<p class='text-neutral-500 font-medium text-sm'>Completed packages</p>
									<h4 class='font-display font-semibold'>{{ completedPackagesCount }}</h4>
								</div>
							</div>
							<div class='flex flex-col p-8 flex-1 space-y-4'>
								<p class='text-neutral-500 font-medium text-sm'>Activities in past 7 days</p>
							</div>
						</div>
					</div>
				</div>
				<div class='flex-1 overflow-auto min-w-fit'>
					<transition name='fade' mode='out-in'>
						<div v-if='isLoading' class='space-y-4 flex flex-col h-full'>
							<div class='bg-slate-200 animate-pulse rounded-xl border border-blue-500 w-full h-44' />
							<div class='bg-slate-200 animate-pulse rounded-xl border w-full flex-1' />
						</div>
						<div class='h-full space-y-4 flex flex-col overflow-auto' v-else>
							<div
								class='bg-white border border-blue-600 rounded-xl shadow-xl shadow-blue-100'
							>
								<div
									class='flex items-center justify-between border-b px-4 py-2'
								>
									<p class='text-sm font-bold uppercase text-neutral-500'>
										Current Package
									</p>
								</div>
								<div class='flex items-center justify-between p-8'>
									<div class='space-y-1'>
										<h4 class='font-semibold font-display uppercase text-blue-600'>{{ currentPackageName }}</h4>
										<div class='rounded-lg border flex items-center divide-x w-fit overflow-hidden'>
											<div
												class='p-1 flex bg-neutral-200 items-center space-x-1 text-neutral-500'>
												<Square2StackIcon class='w-4 h-4 text-neutral-500' />
												<p class='uppercase text-xs font-semibold'>Current Partition</p>
											</div>
											<div class='p-1'>
												<p class='font-bold text-xs'>{{ currentPartitionName }}</p>
											</div>
										</div>
									</div>
									<router-link to='/topics'>
										<button class='btn-accent p-1'>
											<ArrowUpRightIcon class='w-5 h-5' />
										</button>
									</router-link>
								</div>
							</div>
							<div
								class='flex-1 bg-white border rounded-xl p-8 space-y-8 overflow-auto'>
								<div class='rounded-lg space-y-2'>
									<p class='uppercase text-sm text-neutral-500 font-semibold'>Upcoming</p>
									<router-link :to='`/workspace/${currentTopicOrQuizId}`' class='block'>
										<TopicCard :topic-id='currentTopicOrQuizId' class='!bg-neutral-100' accent />
									</router-link>
								</div>
								<div class='rounded-lg space-y-2 overflow-auto flex-1'>
									<p class='uppercase text-sm text-neutral-500 font-semibold'>More in
										{{ currentPartitionName
										}}</p>
									<div class='space-y-4 overflow-auto'>
										<router-link :to='`/workspace/${topic.id}`' v-for='topic in upcomingTopics'
													 class='block'>
											<TopicCard :topic-id='topic.id'
													   class='!bg-neutral-100' accent />
										</router-link>
									</div>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import {
	PlusIcon,
	ChevronRightIcon,
	ArrowUpRightIcon,
	Square2StackIcon,
} from '@heroicons/vue/24/outline/index.js';
import { ChartBarIcon } from '@heroicons/vue/24/solid/index.js';
import Index from '@/layouts/utils/index.vue';
import { getMe } from '@/api/me.js';
import { computed, onUnmounted } from 'vue';
import Dock from '@/layouts/dock/dock.vue';
import TopicCard from '@/components/pile/topic/topicCard.vue';
import moment from 'moment';
import Activities from '@/layouts/activity/activities.vue';
import { useMyStore } from '@/store/me.js';
import { getAnnouncements } from '@/api/announcement.js';
import { useInfoStore } from '@/store/info.js';

const userStore = useMyStore();
const infoStore = useInfoStore();
const meResponse = getMe({
	populate: {
		currentPackage: true,
		currentTopicOrQuiz: {
			populate: {
				topic: {
					fields: ['id'],
					populate: {
						partitions: {
							populate: {
								'package': {
									fields: ['id'],
								},
								'topics': {
									fields: ['id'],
								},
							},
						},
					},
				},
				quiz: {
					fields: ['id'],
					populate: ['partition'],
				},
			},
		},
		completedTopics: {
			fields: ['id'],
		},
		completedProblems: {
			fields: ['id'],
		},
		completedPackages: {
			fields: ['id'],
		},
	},
});

const isLoading = computed(() => {
	return meResponse.isFetching.value || (!meResponse.isFetching.value && !meResponse.isFinished.value);
});

const me = computed(() => {
	return meResponse.data.value;
});

const createdAt = computed(() => {
	return new Date(me.value?.createdAt);
});

const createdAtToNowString = computed(() => {
	return moment(createdAt.value).fromNow();
});

const currentPackage = computed(() => {
	return me.value?.currentPackage;
});

const currentPackageName = computed(() => {
	return currentPackage.value?.name;
});

const currentType = computed(() => {
	if (me.value?.currentTopicOrQuiz.length) {
		switch (me.value?.currentTopicOrQuiz[0].__component) {
			case 'relation.topic-connector' :
				return 'topic';
			case 'relation.quiz-connector' :
				return 'quiz';
			default:
				return null;
		}
	}
});

const currentTopicOrQuiz = computed(() => {
	switch (currentType.value) {
		case 'topic' :
			return me.value.currentTopicOrQuiz[0].topic;
		case 'quiz' :
			return me.value.currentTopicOrQuiz[0].quiz;
		default:
			return null;
	}
});

const currentTopicOrQuizId = computed(() => {
	return currentTopicOrQuiz.value?.id;
});

const currentPartition = computed(() => {
	switch (currentType.value) {
		case 'topic':
			return currentTopicOrQuiz.value?.partitions.filter(partition => partition.package.id === currentPackage.value?.id)[0];
		case 'quiz':
			return currentTopicOrQuiz.value?.partition;
	}
});

const currentPartitionName = computed(() => {
	return currentPartition.value?.name;
});

const currentPartitionTopics = computed(() => {
	return currentPartition.value?.topics;
});

const completedTopics = computed(() => {
	return me.value?.completedTopics;
});

const completedTopicsCount = computed(() => {
	return completedTopics.value?.length;
});

const completedProblems = computed(() => {
	return me.value?.completedProblems;
});

const completedProblemsCount = computed(() => {
	return completedProblems.value?.length;
});

const completedPackages = computed(() => {
	return me.value?.completedPackages;
});

const completedPackagesCount = computed(() => {
	return completedPackages.value?.length;
});

const upcomingTopics = computed(() => {
	if (currentPartitionTopics.value) {
		const nextTopicIndex = currentPartitionTopics.value.findIndex(topic => topic.id === currentTopicOrQuizId.value) + 1;
		return currentPartitionTopics.value.slice(nextTopicIndex);
	}
});

const announcementsResponse = getAnnouncements({
	sort: ['publishedAt:desc'],
	populate: ['cover'],
	pagination: {
		pageSize: 1,
	},
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

onUnmounted(() => {
	if (meResponse.canAbort.value) {
		meResponse.abort();
	}
});
</script>
