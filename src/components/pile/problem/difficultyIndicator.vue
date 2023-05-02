<template>
	<VenustTooltip>
		<template #reference>
			<div class="flex flex-col items-center space-y-1">
				<div class="relative">
					<cube-transparent-icon
						class="h-6 w-6"
						:style="{ color: secondaryColor }"
					/>
					<p
						class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
						:style="{ color: primaryColor }"
					>
						{{ difficultyId }}
					</p>
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
		<template #tooltip>
			<p class='text-justify'>{{ description }}</p>
		</template>
	</VenustTooltip>
</template>

<script setup>
import { CubeTransparentIcon } from '@heroicons/vue/24/outline/index.js';
import { computed, ref, watch } from 'vue';
import { getDifficulty } from '@/api/difficulty.js';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';

const props = defineProps({
	showName: Boolean,
	difficultyId: Number,
});

const difficultyResponse = ref();

if (props.difficultyId) {
	difficultyResponse.value = getDifficulty(props.difficultyId);
}

watch(props, (newProps) => {
	if (newProps.difficultyId) {
		difficultyResponse.value = getDifficulty(newProps.difficultyId);
	}
});

const difficulty = computed(() => {
	return difficultyResponse.value?.data?.data?.attributes;
});

const name = computed(() => {
	return difficulty.value?.name;
});

const description = computed(() => {
	return difficulty.value?.description;
})

const primaryColor = computed(() => {
	return difficulty.value?.primaryColor;
});

const secondaryColor = computed(() => {
	return difficulty.value?.secondaryColor;
});
</script>
