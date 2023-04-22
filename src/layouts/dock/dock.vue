<template>
	<div class="flex items-center justify-between border-b bg-white px-6 py-4">
		<div class="flex items-end">
			<slot />
		</div>
		<Search />
	</div>
</template>

<script setup>
import VenustInput from '@/components/venust/input/venustInput.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline/index.js';
import Search from '@/layouts/search/search.vue';
</script>
