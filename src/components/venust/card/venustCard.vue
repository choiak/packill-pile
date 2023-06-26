<template>
	<div
		class="group block rounded-lg border bg-white shadow-lg transition hover:border-blue-600 hover:brightness-95"
	>
		<div class="relative p-2">
			<img
				src="../../../assets/img/gradient.jpg"
				class="rounded-lg shadow"
			/>
			<div
				class="absolute left-1/2 top-1/2 hidden h-fit w-fit -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow transition group-hover:block group-hover:brightness-110 group-active:scale-90"
			>
				<ArrowUpRightIcon class="h-6 w-6" />
			</div>
		</div>
		<div class="p-4">
			<slot />
		</div>
	</div>
</template>

<script setup>
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline/index.js';
</script>
