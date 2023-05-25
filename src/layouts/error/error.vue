<template>
	<div
		class="flex h-screen w-screen flex-col justify-between bg-orange-600 p-8"
	>
		<div>
			<button
				class="flex w-fit items-center space-x-1 rounded-lg p-2 text-white transition hover:bg-white hover:text-black hover:shadow active:shadow-blue-900"
				@click.prevent="router.back()"
			>
				<ArrowLeftCircleIcon class="h-5 w-5" />
				<label>Back</label>
			</button>
		</div>
		<div class="flex items-end justify-between">
			<div class="space-y-4 max-w-[512px]">
				<div class='flex space-x-4 items-baseline'>
					<h1 class="font-semibold drop-shadow-xl text-white">{{ code }}</h1>
					<h5 class="font-medium uppercase drop-shadow-xl text-white">{{ statusText }}</h5>
				</div>
				<p class="leading-5 drop-shadow-xl text-white">{{ description }}</p>
			</div>
			<div class="max-w-[25%] space-y-4">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup>
import router from '@/router/index.js';
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/outline/index.js';

const props = defineProps({
	code: Number,
	statusText: String,
	description: String,
});
</script>
