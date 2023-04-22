<template>
	<div class="flex h-full flex-col bg-white">
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
				<button
					class="rounded-lg border p-0.5 text-neutral-700 transition hover:brightness-95 active:scale-90"
					v-if="problemId"
					:class="{
						'bg-white': !submissionsIsActive,
						'border-blue-600 bg-blue-600 text-white':
							submissionsIsActive,
					}"
					@click.prevent="toggleSubmissions"
				>
					<ClockIcon class="h-4 w-4" />
				</button>
			</div>
		</div>
		<div
			class="relative flex-1 overflow-auto px-6 py-4"
			v-if="problemId !== 0"
		>
			<ProblemContent
				:problem-id="problemId"
				v-show="!submissionsIsActive"
			/>
			<Submissions :problem-id="problemId" v-show="submissionsIsActive" />
		</div>
	</div>
</template>

<script setup>
import { ClockIcon, ListBulletIcon } from '@heroicons/vue/24/outline';
import { PencilIcon, DocumentCheckIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import Submissions from '@/layouts/submission/problemSubmissions.vue';
import ProblemContent from '@/layouts/problem/problemContent.vue';
import VenustInput from '@/components/venust/input/venustInput.vue';
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';
import ProblemList from '@/layouts/problem/problemList.vue';

const props = defineProps({
	topicId: Number,
	problemId: Number,
});

const submissionsIsActive = ref(false);

function toggleSubmissions() {
	submissionsIsActive.value = !submissionsIsActive.value;
}

console.log(props.problemId);
</script>
