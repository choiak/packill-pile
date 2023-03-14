<template>
	<div @click="toggle" class="relative">
		<slot name="toggler"></slot>
		<slot />
	</div>
</template>

<script setup>
import { provide, reactive } from 'vue';

const state = reactive({ isActive: false });

provide('state', state);

function toggle() {
	state.isActive = !state.isActive;
}
</script>
