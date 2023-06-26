<template>
	<Index>
		<Dock>
			<div v-if='isLoading' class='space-y-1'>
				<div class='rounded bg-slate-200 animate-pulse w-32 h-7' />
				<div class='rounded bg-slate-200 animate-pulse w-20 h-4' />
			</div>
			<div v-else>
				<h5 class='font-medium'>{{ pack?.name }}</h5>
				<p class='text-sm'>Topics list</p>
			</div>
		</Dock>
		<div class='overflow-auto space-y-5 p-2'>
			<div class='flex space-x-4'>
				<div>
					<VenustBadge>{{ partitionsCount }} PARTITIONS</VenustBadge>
				</div>
				<div
					v-if='pack?.certificated'
					class='flex space-x-2'
				>
					<TrophyIcon class='h-4 w-4' />
					<label>Certificated</label>
				</div>
				<div class='flex'>
					<TrophyIcon class='h-6 w-6 p-1' />
					<label>Certificated</label>
				</div>
			</div>
			<div class='space-y-2 pl-2'>
				<div
					v-for='partition in partitions' :key='partition.id'
				>
					<div class='flex font-medium items-center space-x-4'>
						<div class='px-1 py-0.5 text-white bg-blue-700 rounded'>
							<p>{{ partition?.attributes?.name }}</p>
						</div>
						<div>
							<VenustBadge>{{ partition.attributes.topics.data.length }} TOPICS</VenustBadge>
						</div>
					</div>
					<div class='pt-2 space-y-2'>
						<div class='pl-4'>
							<p>{{ partition.attributes.description }}</p>
						</div>
						<div class='pt-2 px-4 pb-6 flex space-x-4 flex-nowrap overflow-x-auto snap-x'>
							<router-link
								:to='`/workspace/${topic.id}`'
								v-for='topic in partition.attributes.topics.data' :key='topic.id'
								class='flex flex-col-reverse py-2 px-4 h-40 w-60 bg-blue-700 rounded shadow-md transition hover:ease-in-out duration-100 text-white snap-start scroll-ml-4 hover:scale-105 hover:shadow-blue-400 hover:shadow-lg hover:brightness-110 flex-shrink-0'
							>
								<p class='mt-auto font-medium'>
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
