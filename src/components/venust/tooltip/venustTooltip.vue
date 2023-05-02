<template>
	<div>
		<div class='relative'>
			<div @mouseover='open' @mouseleave='close' ref='elReference'>
				<slot name='reference' />
			</div>
			<transition name='fade' class='z-30'>
				<div
					class='flex items-center rounded-lg space-x-1 px-2 py-1 text-xs text-white bg-neutral-950/75 absolute max-w-[300px] w-max shadow'
					v-show='isActive' ref='elTooltip'>
					<slot name='tooltip' />
				</div>
			</transition>
		</div>
	</div>
</template>

<script setup>
import { nextTick, onUnmounted, ref, unref } from 'vue';
import { createPopper } from '@popperjs/core';

const props = defineProps({
	modifiers: {
		type: Array,
		default: [],
	},
});

const isActive = ref(false);

function open() {
	createPopperInstance();
	isActive.value = true;
}

function close() {
	isActive.value = false;
}

const elReference = ref(null);
const elTooltip = ref(null);
let popperInstance = null;

const createPopperInstance = () => {
	popperInstance = createPopper(unref(elReference), unref(elTooltip), {
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