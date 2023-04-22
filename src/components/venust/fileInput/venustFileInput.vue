<template>
	<div>
		<input
			type="file"
			class="hidden"
			:id="`${name}-file-input`"
			@change="getFile"
		/>
		<label
			:for="`${name}-file-input`"
			class="flex items-center justify-center space-x-1 rounded-lg border border-gray-300 bg-neutral-50 px-2 py-2 text-sm font-medium transition hover:brightness-95 active:scale-95"
		>
			<CloudArrowUpIcon class="h-4 w-4" />
			<span>Upload</span>
		</label>
	</div>
</template>

<script setup>
import { CloudArrowUpIcon } from '@heroicons/vue/24/outline/index.js';
import { ref, watch } from 'vue';

const props = defineProps({
	name: String,
});

function getFile(e) {
	const file = e.target.files || e.dataTransfer.files;
	if (file.length) {
	}
}
</script>
