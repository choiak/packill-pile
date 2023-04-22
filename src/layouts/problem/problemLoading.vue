<template>
	<div class="flex h-full flex-col items-center justify-between p-6">
		<div class="flex flex-1 flex-col items-center justify-center space-y-2">
			<CubeTransparentIcon
				class="h-6 w-6 animate-pulse text-neutral-500"
			/>
			<h5 class="animate-pulse font-bold">Packill</h5>
		</div>
		<div class="space-y-1">
			<p class="text-center font-serif text-sm text-neutral-700">
				composed with
				<em
					class="bg-gradient-to-r from-rose-700 to-purple-900 bg-clip-text normal-case text-transparent"
				>
					love
				</em>
				in Hong Kong
			</p>
			<p class="text-center text-xs font-medium text-neutral-500">
				Site design / logo / content © {{ currentYear }} Packill
			</p>
		</div>
	</div>
</template>

<script setup>
import { CubeTransparentIcon } from '@heroicons/vue/24/outline/index.js';
import { ref } from 'vue';

const currentYear = ref(new Date(Date.now()).getFullYear());
</script>
