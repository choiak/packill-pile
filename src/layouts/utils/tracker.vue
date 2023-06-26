<template>
	<div v-if="currentPackage">
		<p class="text-xs font-medium text-neutral-500">
			{{ currentPackageName }}
		</p>
		<router-link
			to="/topics"
			class="flex items-center space-x-1 hover:underline hover:decoration-sky-800 hover:underline-offset-2"
		>
			<div>
				<p
					class="font-display font-semibold text-blue-600"
					v-if="isCurrentPackageCompleted"
				>
					Overview
				</p>
				<p class="font-display font-semibold text-blue-600" v-else>
					{{ currentPartitionName }}
				</p>
			</div>
			<ArrowUpRightIcon class="h-3 w-3 stroke-2 text-blue-600" />
		</router-link>
		<VenustTooltip>
			<template #reference>
				<div class="relative h-1 w-full rounded bg-neutral-300">
					<div
						class="absolute left-0 top-0 h-1 rounded bg-blue-600"
						:style="{
							width: `${currentPartitionProgressPercentage}%`,
						}"
					/>
				</div>
			</template>
			<template #tooltip>
				<span v-if="isCurrentPackageCompleted">
					Hooray! You have completed {{ currentPackageName }}.
				</span>
				<span v-else>
					You have completed {{ currentPartitionProgressPercentage }}%
					of the partition so far.
				</span>
			</template>
		</VenustTooltip>
	</div>
	<div v-else>
		<p class="text-xs font-medium text-neutral-500">
			Select your package to get started
		</p>
		<router-link
			to="/packages"
			class="flex items-center space-x-1 hover:underline hover:decoration-sky-800 hover:underline-offset-2"
		>
			<p class="font-display font-semibold text-blue-600">
				Unpack a new package
			</p>
			<ArrowUpRightIcon class="h-3 w-3 stroke-2 text-blue-600" />
		</router-link>
	</div>
</template>

<script setup>
import { useMyStore } from '@/store/me.js';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline/index.js';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';

const myStore = useMyStore();

const {
	currentPackage,
	currentPartition,
	currentPartitionProgress,
	isCurrentPackageCompleted,
} = storeToRefs(myStore);

const currentPackageName = computed(() => {
	return currentPackage.value?.name;
});

const currentPartitionName = computed(() => {
	return currentPartition.value?.name;
});

const currentPartitionProgressPercentage = computed(() => {
	if (currentPartitionProgress.value) {
		return Math.round(currentPartitionProgress.value * 100);
	} else if (isCurrentPackageCompleted.value) {
		return 100;
	} else {
		return 0;
	}
});
</script>
