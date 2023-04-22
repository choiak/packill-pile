<template>
	<div
		class="w-full border bg-slate-50 p-4 transition first:rounded-t-lg last:rounded-b-lg"
		:class="{ shadow: isActive }"
		@click="toggle"
	>
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-4">
				<slot name="icon" />
				<slot name="header" />
			</div>
			<ArrowSmallRightIcon
				class="h-5 w-5 text-neutral-700 transition"
				:class="{ 'rotate-90': isActive }"
			/>
		</div>
	</div>
	<Transition name="fade">
		<div
			class="w-full border px-8 py-8 last:rounded-b-lg"
			v-show="isActive"
		>
			<slot name="content" />
		</div>
	</Transition>
</template>

<script setup>
import { ArrowSmallRightIcon } from '@heroicons/vue/24/outline/index.js';
import { ref } from 'vue';

const isActive = ref(false);

function toggle() {
	isActive.value = !isActive.value;
}
</script>
