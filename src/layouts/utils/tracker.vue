<template>
	<div>
		<div>
			<p class='text-xs text-neutral-500 font-medium'>{{ currentPackageName }}</p>
			<router-link to='/topics' class='flex items-center space-x-1 hover:underline hover:underline-offset-2 hover:decoration-sky-800 '>
				<p class='font-semibold text-blue-600 font-display'>{{ currentPartitionName }}</p>
				<ArrowUpRightIcon class='text-blue-600 h-3 w-3 stroke-2'/>
			</router-link>
			<VenustTooltip>
				<template #reference>
					<div class='relative w-full rounded h-1 bg-neutral-300'>
						<div class='absolute left-0 top-0 rounded h-1 bg-blue-600'
							 :style='{width: `${currentPartitionProgressPercentage}%`}' />
					</div>
				</template>
				<template #tooltip>
					You have completed {{currentPartitionProgressPercentage}}% of the partition so far.
				</template>
			</VenustTooltip>
		</div>
	</div>
</template>

<script setup>
import { useMyStore } from '@/store/me.js';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline/index.js';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';

const myStore = storeToRefs(useMyStore());

const { currentPackage, currentPartition, currentPartitionProgress, } = myStore;

const currentPackageName = computed(() => {
	return currentPackage.value?.name;
});

const currentPartitionName = computed(() => {
	return currentPartition.value?.name;
});

const currentPartitionProgressPercentage = computed(() => {
	if (currentPartitionProgress.value) {
		return Math.round(currentPartitionProgress.value * 100);
	} else {
		return 0;
	}
});
</script>