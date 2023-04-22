<template>
	<div
		class="h-[200px] w-[200px] rounded-xl border border-gray-300 bg-neutral-50 p-4 shadow-sm"
	>
		<form
			class="flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed bg-white p-2 transition hover:border hover:border-blue-600 hover:shadow-lg hover:shadow-blue-100"
		>
			<CloudArrowUpIcon class="h-6 w-6" />
			<p class="text-center text-sm font-medium">
				Drag and drop to upload
			</p>
		</form>
	</div>
</template>

<script setup>
import { CloudArrowUpIcon } from '@heroicons/vue/24/outline/index.js';
</script>
