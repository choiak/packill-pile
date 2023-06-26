<template>
	<div v-if='currentPackage'>
			<p class='text-xs text-neutral-500 font-medium'>{{ currentPackageName }}</p>
			<router-link to='/topics'
						 class='flex items-center space-x-1 hover:underline hover:underline-offset-2 hover:decoration-sky-800 '>
				<div>
					<p class='font-semibold text-blue-600 font-display' v-if='isCurrentPackageCompleted'>Overview</p>
					<p class='font-semibold text-blue-600 font-display' v-else>{{ currentPartitionName }}</p>
				</div>
				<ArrowUpRightIcon class='text-blue-600 h-3 w-3 stroke-2' />
			</router-link>
			<VenustTooltip>
				<template #reference>
					<div class='relative w-full rounded h-1 bg-neutral-300'>
						<div class='absolute left-0 top-0 rounded h-1 bg-blue-600'
							 :style='{width: `${currentPartitionProgressPercentage}%`}' />
					</div>
				</template>
				<template #tooltip>
					<span v-if='isCurrentPackageCompleted'>Hooray! You have completed {{ currentPackageName }}.</span>
					<span v-else>You have completed {{ currentPartitionProgressPercentage }}% of the partition so far.</span>
				</template>
			</VenustTooltip>
	</div>
	<div v-else>
		<p class='text-xs text-neutral-500 font-medium'>Select your package to get started</p>
		<router-link to='/packages'
					 class='flex items-center space-x-1 hover:underline hover:underline-offset-2 hover:decoration-sky-800 '>
			<p class='font-semibold text-blue-600 font-display'>Unpack a new package</p>
			<ArrowUpRightIcon class='text-blue-600 h-3 w-3 stroke-2' />
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

const { currentPackage, currentPartition, currentPartitionProgress, isCurrentPackageCompleted } = storeToRefs(myStore);

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