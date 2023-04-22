<template>
	<div class="flex flex-col items-center space-y-1">
		<div class="relative">
			<p
				class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-bold"
				:style="{ color: primaryColor }"
			>
				{{ difficultyId }}
			</p>
			<cube-transparent-icon
				class="relative h-6 w-6"
				:style="{ color: secondaryColor }"
			/>
		</div>
		<p
			v-if="showName"
			class="text-center text-xs font-medium"
			:style="{ color: primaryColor }"
		>
			{{ name }}
		</p>
	</div>
</template>

<script setup>
import { CubeTransparentIcon } from '@heroicons/vue/24/outline/index.js';
import { computed, ref, watch } from 'vue';
import { getDifficulty } from '@/api/workspace.js';
import { getUserAvatar } from '@/api/user.js';

const props = defineProps({
	showName: Boolean,
	difficultyId: Number,
});

const difficulty = ref();

if (props.difficultyId) {
	difficulty.value = getDifficulty(props.difficultyId);
}

watch(props, (newProps) => {
	if (newProps.difficultyId) {
		difficulty.value = getDifficulty(newProps.difficultyId);
	}
});

const attributes = computed(() => {
	return difficulty.value?.data?.data?.attributes;
});

const name = computed(() => {
	return attributes.value?.name;
});

const primaryColor = computed(() => {
	return attributes.value?.primaryColor;
});

const secondaryColor = computed(() => {
	return attributes.value?.secondaryColor;
});
</script>
