<template>
	<div class="flex flex-col bg-white">
		<div class="flex items-center justify-between border-b px-4 py-2">
			<div class="flex items-center space-x-1">
				<PencilIcon class="h-4 w-4 text-neutral-500" />
				<p class="font-bold uppercase text-neutral-500">Problem</p>
			</div>
			<div class="flex items-center space-x-2">
				<VenustDropdown alignment="right">
					<template #toggler>
						<button
							class="block rounded-lg border bg-white p-0.5 text-neutral-700 transition hover:brightness-95 active:scale-90"
						>
							<ListBulletIcon class="h-4 w-4" />
						</button>
					</template>
					<template #container>
						<ProblemList :topic-id="topicId" />
					</template>
				</VenustDropdown>
			</div>
		</div>
		<div class="flex flex-1 flex-col items-center justify-center">
			<div class="space-y-2">
				<DocumentCheckIcon
					class="ml-auto mr-auto h-10 w-10 text-neutral-300"
				/>
				<p
					class="max-w-[300px] text-center text-sm font-medium tracking-wide text-neutral-500"
				>
					Hey, you are a
					<span
						class="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent"
					>
						master
					</span>
					now. You have finished all the problems that are related to
					this topic.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { DocumentCheckIcon } from '@heroicons/vue/24/solid';
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';
import { ClockIcon, ListBulletIcon } from '@heroicons/vue/24/outline/index.js';
import ProblemList from '@/layouts/problem/problemList.vue';
import { PencilIcon } from '@heroicons/vue/24/solid/index.js';

const props = defineProps({
	topicId: Number,
});
</script>
