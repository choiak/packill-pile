<template>
	<a :href="url" class="mx-1.5 my-1.5 block px-4 py-2">
		<slot />
	</a>
</template>

<script setup>
defineProps({
	url: String,
});
</script>
