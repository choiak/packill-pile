<template>
	<div class="space-y-4 rounded-lg bg-white p-4">
		<div class="space-y-2">
			<div class="flex items-center justify-between">
				<div
					class="w-fit rounded border px-1 text-xs font-medium text-neutral-500"
				>
					Multiple Choice
				</div>
				<div
					class="w-fit rounded border px-1 text-xs font-medium"
					:class="{
						'border-blue-600 text-blue-600': stateIsAC,
						'border-yellow-600 text-yellow-600': stateIsWA,
					}"
				>
					{{ state }}
				</div>
			</div>
			<p class="text-justify text-sm">{{ description }}</p>
		</div>
		<div class="space-y-1">
			<p class="text-xs text-neutral-500">You answered</p>
			<div class="space-y-2">
				<label
					v-for="selectedOption in selectedOptions"
					class="block rounded-lg border bg-neutral-50 px-4 py-2 font-medium shadow-sm transition"
					:class="{
						'border-blue-300': stateIsAC,
						'border-yellow-400': stateIsWA,
					}"
				>
					{{ selectedOption.statement }}
				</label>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	question: Object,
	answer: Array,
	state: String,
});

const content = computed(() => {
	return props.question?.attributes?.content;
});

const description = computed(() => {
	return content.value[0].description;
});

const options = computed(() => {
	return content.value[0].options;
});

const stateIsAC = computed(() => {
	return props.state === 'AC';
});

const stateIsWA = computed(() => {
	return props.state === 'WA';
});

const selectedOptions = computed(() => {
	return options.value?.filter((option) => props.answer.includes(option.id));
});
</script>
