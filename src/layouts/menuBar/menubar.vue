<template>
	<div class="flex flex-col justify-between border-r bg-white px-6 py-4">
		<NavSection />
		<UserSection />
	</div>
</template>

<script setup>
import NavSection from '@/layouts/menuBar/navSection.vue';
import UserSection from '@/layouts/menuBar/userSection.vue';
</script>
