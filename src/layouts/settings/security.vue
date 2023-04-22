<template>
	<div class="flex space-x-4">
		<div class="flex-1 space-y-4">
			<div class="rounded-xl border bg-white">
				<div
					class="flex items-center justify-between border-b px-4 py-2"
				>
					<label class="text-sm font-bold uppercase text-neutral-500">
						Password
					</label>
					<div class="flex items-center space-x-1">
						<IdentificationIcon class="h-5 w-5 text-neutral-500" />
					</div>
				</div>
				<div class="space-y-8 p-8"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { IdentificationIcon } from '@heroicons/vue/24/solid/index.js';
</script>
