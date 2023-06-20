<template>
	<div class="flex items-center justify-between border-b bg-white px-6 py-4">
		<div class="flex items-end">
			<slot />
		</div>
		<div class='flex items-center space-x-8'>
			<Tracker />
			<Search />
		</div>
	</div>
</template>

<script setup>
import Search from '@/layouts/search/search.vue';
import Tracker from '@/layouts/utils/tracker.vue';
</script>
