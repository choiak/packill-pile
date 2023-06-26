<template>
	<div
		class="flex items-start space-x-4 rounded-lg border bg-white p-4 shadow-xl"
	>
		<div class="flex flex-col items-center space-y-2">
			<slot name="icon" />
			<div
				class="h-2 w-2 animate-pulse rounded-full bg-blue-600"
				:class="{ hidden: isRead }"
			/>
		</div>
		<div class="flex-1 space-y-4">
			<p class="text-sm font-semibold">
				<slot name="message" />
			</p>
			<div>
				<slot name="content" />
			</div>
			<div class="flex items-baseline justify-between">
				<p class="text-xs font-semibold">{{ time }}</p>
				<p class="text-xs font-semibold">{{ date }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import moment from 'moment';

const props = defineProps({
	timestamp: Date,
	isRead: Boolean,
});

const date = computed(() => {
	return moment(props.timestamp).format('L');
});

const time = computed(() => {
	return moment(props.timestamp).format('LT');
});
</script>
