<template>
	<div class="space-y-8">
		<div class="flex items-start justify-between">
			<div class='flex items-start space-x-4'>
				<div class="rounded-full border border-blue-600 bg-white p-2">
					<Square3Stack3DIcon class="h-4 w-4" />
				</div>
				<div class="flex w-full items-center justify-between">
					<div class="space-y-1">
						<h5 class="font-semibold text-neutral-700">{{ name }}</h5>
						<div class="flex items-center space-x-1">
							<VenustTag
								v-for="area in areas"
								class="border"
								:style="{
								color: area.primaryColor,
								background: area.secondaryColor,
								borderColor: area.primaryColor,
							}"
							>
								{{ area.name }}
							</VenustTag>
						</div>
					</div>
				</div>
			</div>
			<div>
				<router-link :to='`/packages/${id}`'>
					<button class='btn-accent p-1'>
						<ArrowUpRightIcon class='w-5 h-5' />
					</button>
				</router-link>
			</div>
		</div>
		<div class="px-4 py-2 border rounded-lg bg-neutral-100 w-full space-y-4">
				<div class='space-y-1'>
					<div class='flex items-center justify-between'>
						<p class='uppercase text-xs text-neutral-500 font-bold'>State</p>
						<BeakerIcon class='h-4 w-4 text-neutral-500'/>
					</div>
					<p class='text-sm font-bold text-neutral-500 capitalize'>
						{{ state }}
					</p>
				</div>
				<div class='space-y-1' v-if='certificated'>
					<div class='flex items-center justify-between'>
						<p class='text-sm font-bold text-neutral-500 text-justify'>
							Certificated
						</p>
						<TrophyIcon class='h-4 w-4 text-neutral-500'/>
					</div>
				</div>
		</div>
		<div class='space-y-2'>
			<div class='flex items-center justify-between'>
				<p class='uppercase text-sm text-neutral-500 font-bold'>This package is about</p>
			</div>
			<p class="text-sm font-medium text-neutral-500 text-justify">
				{{ description }}
			</p>
		</div>
		<div class='space-y-2'>
			<div class='flex items-center justify-between'>
				<p class='uppercase text-sm text-neutral-500 font-bold'>This package aims to</p>
			</div>
			<p class="text-sm font-medium text-neutral-500 text-justify">
				{{ objective }}
			</p>
		</div>
		<div class='space-y-2'>
			<div class='flex items-center justify-between'>
				<p class='uppercase text-sm text-neutral-500 font-bold'>Partitions inside</p>
				<VenustBadge>{{ partitionsCount }}</VenustBadge>
			</div>
			<div class='space-y-2'>
				<div v-for='partition in partitions' class='rounded-lg border bg-neutral-100 px-4 py-2 space-y-2'>
					<div class='flex items-center space-x-4'>
						<Square2StackIcon class='h-4 w-4 text-neutral-500 min-w-fit'/>
						<p class='font-semibold text-neutral-500'>{{ partition.name }}</p>
					</div>
					<p class='font-medium text-xs text-neutral-500 ml-8' v-if='partition.description'>{{ partition.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	BeakerIcon,
	Square2StackIcon, Square3Stack3DIcon,
	TrophyIcon, ArrowUpRightIcon,
} from '@heroicons/vue/24/outline/index.js';
import VenustTag from '@/components/venust/tag/venustTag.vue';
import { computed } from 'vue';
import VenustBadge from '@/components/venust/badge/venustBadge.vue';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';

const props = defineProps({
	packageObject: Object,
});

const id = computed(() => {
	return props.packageObject.id;
})

const name = computed(() => {
	return props.packageObject.name;
});

const state = computed(() => {
	return props.packageObject.state;
})

const areas = computed(() => {
	return props.packageObject.areas;
});

const partitions = computed(() => {
	return props.packageObject.partitions;
});

const partitionsCount = computed(() => {
	if (partitions.value) {
		return partitions.value.length;
	}
});

const certificated = computed(() => {
	return props.packageObject.certificated;
})

const description = computed(() => {
	return props.packageObject.description;
})

const objective = computed(() => {
	return props.packageObject.objective;
});
</script>
