<template>
	<Index>
		<Dock>
			<div v-if="isLoading" class="space-y-1">
				<div class="h-7 w-32 animate-pulse rounded bg-slate-200" />
				<div class="h-4 w-20 animate-pulse rounded bg-slate-200" />
			</div>
			<div v-else>
				<h5 class="font-medium">{{ pack?.name }}</h5>
				<p class="text-sm">Topics list</p>
			</div>
		</Dock>
		<div class="space-y-5 overflow-auto p-2">
			<div class="flex space-x-4">
				<div>
					<VenustBadge>{{ partitionsCount }} PARTITIONS</VenustBadge>
				</div>
				<div v-if="pack?.certificated" class="flex space-x-2">
					<TrophyIcon class="h-4 w-4" />
					<label>Certificated</label>
				</div>
				<div class="flex">
					<TrophyIcon class="h-6 w-6 p-1" />
					<label>Certificated</label>
				</div>
			</div>
			<div class="space-y-2 pl-2">
				<div v-for="partition in partitions" :key="partition.id">
					<div class="flex items-center space-x-4 font-medium">
						<div class="rounded bg-blue-700 px-1 py-0.5 text-white">
							<p>{{ partition?.attributes?.name }}</p>
						</div>
						<div>
							<VenustBadge>
								{{
									partition.attributes.topics.data.length
								}}
								TOPICS
							</VenustBadge>
						</div>
					</div>
					<div class="space-y-2 pt-2">
						<div class="pl-4">
							<p>{{ partition.attributes.description }}</p>
						</div>
						<div
							class="flex snap-x flex-nowrap space-x-4 overflow-x-auto px-4 pb-6 pt-2"
						>
							<router-link
								:to="`/workspace/${topic.id}`"
								v-for="topic in partition.attributes.topics
									.data"
								:key="topic.id"
								class="flex h-40 w-60 flex-shrink-0 snap-start scroll-ml-4 flex-col-reverse rounded bg-blue-700 px-4 py-2 text-white shadow-md transition duration-100 hover:scale-105 hover:shadow-lg hover:shadow-blue-400 hover:brightness-110 hover:ease-in-out"
							>
								<p class="mt-auto font-medium">
									{{ topic.attributes.title }}
								</p>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import { TrophyIcon } from '@heroicons/vue/24/outline/index.js';
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline/index.js';
import { computed } from 'vue';
import Index from '@/layouts/utils/index.vue';
import Dock from '@/layouts/dock/dock.vue';
import { getPackage } from '@/api/package.js';
import VenustBadge from '@/components/venust/badge/venustBadge.vue';

const packageResponse = getPackage(1, {
	populate: {
		partitions: {
			populate: {
				topics: true,
			},
		},
	},
});

console.log(packageResponse);

const pack = computed(() => {
	return packageResponse.data.value?.data?.attributes;
});

const partitions = computed(() => {
	return pack.value?.partitions?.data;
});

const partitionsCount = computed(() => {
	return partitions.value?.length;
});
</script>
