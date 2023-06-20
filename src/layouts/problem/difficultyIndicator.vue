<template>
	<VenustTooltip>
		<template #reference>
			<div class="flex flex-col items-center space-y-1">
				<div class="relative">
					<div v-if='isLoading'>
						<cube-transparent-icon
							class="h-6 w-6 text-slate-200 animate-pulse"
						/>
						<p
							class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-slate-400 animate-pulse"
						>
							?
						</p>
					</div>
					<div v-else>
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
				</div>
				<div v-if="showName">
					<div v-if='isLoading' class='rounded bg-slate-200 animate-pulse w-6 h-4'/>
					<p
						v-else
						class="text-center text-xs font-medium"
						:style="{ color: primaryColor }"
					>
						{{ name }}
					</p>
				</div>
			</div>
		</template>
		<template #tooltip>
			<p class='text-justify'>{{ description }}</p>
		</template>
	</VenustTooltip>
</template>

<script setup>
import { CubeTransparentIcon } from '@heroicons/vue/24/outline/index.js';
import { computed, watch } from 'vue';
import { getDifficulty } from '@/api/difficulty.js';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';

const props = defineProps({
	showName: Boolean,
	difficultyId: Number,
});

const propDifficultyId = computed(() => {
	return props.difficultyId;
});

const difficultyResponse = getDifficulty(propDifficultyId, {}, { immediate: false });

if (propDifficultyId.value) {
	difficultyResponse.execute();
}

watch(propDifficultyId, (newDifficultyId) => {
	if (newDifficultyId) {
		difficultyResponse.execute();
	}
});

const isLoading = computed(() => {
	return difficultyResponse.isFetching.value || (!difficultyResponse.isFetching.value && !difficultyResponse.isFinished.value) || !propDifficultyId.value;
});

const difficulty = computed(() => {
	return difficultyResponse.data.value?.data?.attributes;
});

const name = computed(() => {
	return difficulty.value?.name;
});

const description = computed(() => {
	return difficulty.value?.description;
});

const primaryColor = computed(() => {
	return difficulty.value?.primaryColor;
});

const secondaryColor = computed(() => {
	return difficulty.value?.secondaryColor;
});
</script>
