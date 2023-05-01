<template>
	<div @click.prevent="toggle" class="relative">
		<div ref='elToggler'>
			<slot name="toggler" />
		</div>
		<transition name="fade">
			<div
				v-show="isActive"
				class="absolute z-20 w-max"
				v-on-click-outside="onClickOutsideHandler"
				ref='elContainer'
			>
				<slot name="container" />
			</div>
		</transition>
	</div>
</template>

<script setup>
import { nextTick, onUnmounted, ref, unref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import { createPopper } from '@popperjs/core';

const props = defineProps({
	modifiers: {
		type: Array,
		default: [],
	},
});

const isActive = ref(false);

const elToggler = ref(null);
const elContainer = ref(null);
let popperInstance = null;

function toggle() {
	isActive.value = !isActive.value;
	if (isActive.value) {
		createPopperInstance()
	}
}

function close() {
	isActive.value = false;
}

const onClickOutsideHandler = [
	() => {
		close()
	},
	{ ignore: [elToggler] }
]

const createPopperInstance = () => {
	popperInstance = createPopper(unref(elToggler), unref(elContainer), {
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 4],
				},
			},
			...props.modifiers,
		],
	});
	nextTick(() => {
		popperInstance.update();
	});
};

const destroyPopperInstance = () => {
	popperInstance?.destroy?.();
	popperInstance = null;
};

onUnmounted(() => {
	destroyPopperInstance();
});
</script>
