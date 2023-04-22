<template>
	<div @click="toggle" class="relative">
		<slot name="toggler" />
		<transition name="fade">
			<div
				v-show="isActive"
				class="absolute z-20 w-max"
				:class="[expandToCSS, alignmentToCSS, orientationToCSS]"
				v-on-click-outside="close"
			>
				<slot name="container" />
			</div>
		</transition>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

const props = defineProps({
	expand: String,
	alignment: String,
	orientation: String,
});

const isActive = ref(false);

function toggle() {
	isActive.value = !isActive.value;
}

function close() {
	isActive.value = false;
}

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
			return 'top-1/2 -translate-y-1/2';
		case 'top':
			return 'top-0';
		default:
			return 'bottom-0';
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
</script>
