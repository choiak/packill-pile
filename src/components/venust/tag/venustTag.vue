<template>
	<label
		class="h-fit w-fit rounded-full px-2 py-1 text-xs font-medium shadow-sm transition"
		:for="labelFor"
	>
		<slot />
	</label>
</template>

<script setup>
const props = defineProps({
	labelFor: String,
});
</script>
