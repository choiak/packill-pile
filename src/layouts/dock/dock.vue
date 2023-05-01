<template>
	<div class="flex items-center justify-between border-b bg-white px-6 py-4">
		<div class="flex items-end">
			<slot />
		</div>
		<Search />
	</div>
</template>

<script setup>
import Search from '@/layouts/search/search.vue';
</script>
