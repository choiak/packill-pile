<template>
	<div class="relative h-10 w-10 overflow-hidden rounded-full transition">
		<img
			:src="imgSrc"
			class="h-full w-full bg-center object-cover"
			:alt="owner"
		/>
	</div>
</template>

<script setup>
const props = defineProps({
	owner: String,
	imgSrc: String,
});
</script>
