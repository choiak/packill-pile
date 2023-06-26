<template>
	<div class="relative flex flex-col justify-between border-r bg-white p-4">
		<NavSection />
		<UserSection />
	</div>
</template>

<script setup>
import NavSection from '@/layouts/menuBar/navSection.vue';
import UserSection from '@/layouts/menuBar/userSection.vue';
</script>
