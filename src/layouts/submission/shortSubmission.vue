<template>
	<div class="space-y-4 rounded-lg bg-white p-4">
		<div class="space-y-2">
			<div class="flex items-center justify-between">
				<div
					class="w-fit rounded border px-1 text-xs font-medium text-neutral-500"
				>
					Short Answer
				</div>
				<div
					class="w-fit rounded border px-1 text-xs font-medium"
					:class="{
						'text-blue-600': stateIsAC,
						'border-blue-600': stateIsAC,
						'text-yellow-600': stateIsWA,
						'border-yellow-600': stateIsWA,
					}"
				>
					{{ state }}
				</div>
			</div>
			<p class="text-justify text-sm">{{ description }}</p>
		</div>
		<div class="space-y-1">
			<p class="text-xs text-neutral-500">You answered</p>
			<p
				class="text-justify font-medium"
				:class="{
					'text-blue-600': stateIsAC,
					'text-yellow-600': stateIsWA,
				}"
			>
				{{ answer }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	question: Object,
	answer: String,
	state: String,
});

const content = computed(() => {
	return props.question?.attributes?.content;
});

const description = computed(() => {
	return content.value[0].description;
});

const stateIsAC = computed(() => {
	return props.state === 'AC';
});

const stateIsWA = computed(() => {
	return props.state === 'WA';
});
</script>
