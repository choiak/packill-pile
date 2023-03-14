<template>
	<div
		v-if="state.isActive"
		v-click-away="close"
		class="absolute w-max"
		:class="[expandToCSS, alignmentToCSS, orientationToCSS]"
	>
		<slot />
	</div>
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
	expand: String,
	alignment: String,
	orientation: String,
});

const expandToCSS = computed(() => {
	switch (props.expand) {
		case 'top':
			return 'bottom-full mb-2';
		case 'right':
			return 'left-full ml-4';
		case 'left':
			return 'right-full mr-4';
		default:
			return 'mt-2';
	}
});

const alignmentToCSS = computed(() => {
	switch (props.alignment) {
		case 'right':
			return 'right-0';
		case 'center':
			return 'left-1/2 -translate-x-1/2';
		case 'top':
			return 'top-0';
		default:
			return '';
	}
});

const orientationToCSS = computed(() => {
	switch (props.orientation) {
		case 'horizontal':
			return 'flex';
		default:
			return '';
	}
});

const state = inject('state');

function close() {
	state.isActive = false;
}
</script>
