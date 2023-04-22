<template>
	<div v-if="category === 'package'" class="space-y-8">
		<div class="flex items-start space-x-4 text-neutral-700">
			<div class="rounded-full border border-blue-600 bg-white p-2">
				<Square3Stack3DIcon class="h-4 w-4" />
			</div>
			<div class="flex w-full items-center justify-between">
				<div class="space-y-1">
					<h5 class="font-semibold">{{ item.name }}</h5>
					<div class="flex items-center space-x-1">
						<VenustTag
							v-for="area in item.areas"
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
		<div class="space-y-8 px-8">
			<div class="grid grid-cols-2 gap-2 text-neutral-500">
				<div class="flex items-center space-x-1">
					<Square2StackIcon class="h-4 w-4" />
					<label>
						<strong>{{ item.partitions.length }}</strong>
						Partitions
					</label>
				</div>
				<div class="flex items-center space-x-1">
					<DocumentTextIcon class="h-4 w-4" />
					<label>
						<strong>337</strong>
						Topics
					</label>
				</div>
				<div class="flex items-center space-x-1">
					<WrenchScrewdriverIcon class="h-4 w-4" />
					<label>
						<strong>{{ projects }}</strong>
						Projects
					</label>
				</div>
				<div
					class="flex items-center space-x-1"
					v-if="item.certificated"
				>
					<TrophyIcon class="h-4 w-4" />
					<label>Certificated</label>
				</div>
			</div>
			<p class="text-sm font-medium text-neutral-500">
				{{ item.description }}
			</p>
		</div>
	</div>
	<div v-if="category === 'topic'" class="space-y-8">
		<div class="flex items-start space-x-4 text-neutral-700">
			<div class="rounded-full border border-blue-600 bg-white p-2">
				<DocumentTextIcon class="h-4 w-4" />
			</div>
			<div class="flex w-full items-center justify-between">
				<div class="space-y-1">
					<h5 class="font-semibold">{{ item.title }}</h5>
					<div class="flex items-center space-x-1">
						<VenustTag
							v-for="area in item.areas"
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
		<div class="px-8">
			<p class="text-sm font-medium text-neutral-500">
				{{ item.description }}
			</p>
		</div>
	</div>
	<div v-if="category === 'knowledge'" class="space-y-8">
		<div class="flex items-start space-x-4 text-neutral-700">
			<div class="rounded-full border border-blue-600 bg-white p-2">
				<LightBulbIcon class="h-4 w-4" />
			</div>
			<div class="flex w-full items-center justify-between">
				<div class="space-y-1">
					<h5 class="font-semibold">{{ item.title }}</h5>
					<div class="flex items-center space-x-1">
						<VenustTag
							v-for="area in item.areas"
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
		<div class="px-8">
			<p class="text-sm font-medium text-neutral-500">
				{{ item.description }}
			</p>
		</div>
	</div>
	<div v-if="category === 'user'" class="space-y-8">
		<div class="flex items-center space-x-4 text-neutral-700">
			<div class="rounded-full border border-blue-600 bg-white p-2">
				<Square3Stack3DIcon class="h-4 w-4" />
			</div>
			<div>
				<h6 class="font-semibold">{{ item.name }}</h6>
			</div>
		</div>
		<div class="px-8">
			<p class="text-sm font-medium text-neutral-500">
				{{ item.description }}
			</p>
		</div>
	</div>
</template>

<script setup>
import {
	Square3Stack3DIcon,
	DocumentTextIcon,
	LightBulbIcon,
	TrophyIcon,
	WrenchScrewdriverIcon,
	Square2StackIcon,
} from '@heroicons/vue/24/outline/index.js';
import VenustTag from '@/components/venust/tag/venustTag.vue';

const props = defineProps({
	item: Object,
	category: String,
});
</script>
