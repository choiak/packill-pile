<template>
	<Index>
		<div class="flex h-full flex-col">
			<Dock>
				<div>
					<h5 class="font-medium">Dashboard</h5>
					<p class="text-sm">Continue your journey at Packill</p>
				</div>
			</Dock>
			<div
				class="flex h-full w-full flex-1 flex-col space-y-8 overflow-auto p-8"
			>
				<div>
					<div
						class="xs:grid-cols-1 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
					>
						<router-link
							to="/packages"
							class="flex h-32 flex-col justify-between rounded-lg border bg-white p-4 transition hover:brightness-90 active:scale-[97%]"
						>
							<PlusIcon class="h-6 w-6" />
							<h6 class="font-medium">Unpack a new package</h6>
						</router-link>
					</div>
				</div>
				<div class="space-y-4" v-if="data?.currentPackage">
					<div class="space-y-1">
						<h5 class="font-semibold">
							{{ data?.currentPackage?.name }}
						</h5>
					</div>
					<div
						class="xs:grid-cols-1 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
					>
						<router-link
							v-for="(topic, index) in upcomingTopics"
							:to="`/workspace/${topic.id}`"
							class="flex h-32 flex-col-reverse justify-between rounded-lg border p-4 transition first:border-0 first:bg-gradient-to-tr first:from-purple-600 first:to-sky-100 first:text-white hover:brightness-90 active:scale-[97%]"
						>
							<div>
								<h6 class="font-medium">{{ topic.title }}</h6>
								<p class="flex space-x-2 text-xs">
									Go to workspace
									<ArrowSmallRightIcon class="h-4 w-4" />
								</p>
							</div>
							<p
								v-if="index === 0"
								class="w-fit rounded bg-white px-2 text-xs font-medium text-black"
							>
								Next
							</p>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import {
	PlusIcon,
	ArrowSmallRightIcon,
} from '@heroicons/vue/24/outline/index.js';
import Index from '@/layouts/utils/index.vue';
import { getMyProgress } from '@/api/me.js';
import { ref, watch } from 'vue';
import Dock from '@/layouts/dock/dock.vue';

const { data, loading } = getMyProgress();
const upcomingTopics = ref();

watch(loading, (loading) => {
	if (!loading) {
		const currentTopicIndex = data.value.currentPartition.topics.findIndex(
			(it) => it.id === data.value.currentTopic.id,
		);
		upcomingTopics.value =
			data.value.currentPartition.topics.slice(currentTopicIndex);
	}
});
</script>
