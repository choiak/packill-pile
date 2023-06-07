<template>
	<div class='flex items-start space-x-4 rounded-lg bg-white shadow-xl border p-4'>
		<div class='flex flex-col items-center space-y-2'>
			<slot name='icon' />
			<div
				class='rounded-full h-2 w-2 bg-blue-600 animate-pulse'
				:class='{"hidden": isRead}'
			/>
		</div>
		<div class='flex-1 space-y-4'>
			<p class='font-semibold text-sm'>
				<slot name='message' />
			</p>
			<div>
				<slot name='content' />
			</div>
			<div class='flex items-baseline justify-between'>
				<p class='text-xs font-semibold'>{{ time }}</p>
				<p class='text-xs font-semibold'>{{ date }}</p>
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
