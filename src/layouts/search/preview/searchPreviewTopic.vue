<template>
	<div class="space-y-8">
		<div class="flex items-start space-x-4 text-neutral-700">
			<div class="rounded-full border border-blue-600 bg-white p-2">
				<DocumentTextIcon class="h-4 w-4" />
			</div>
			<div class="flex w-full items-center justify-between">
				<div class="space-y-1">
					<h5 class="font-semibold">{{ title }}</h5>
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
		<div class='space-y-2'>
			<div class='flex items-center justify-between'>
				<p class='uppercase text-sm text-neutral-500 font-bold'>Knowledges inside</p>
				<VenustBadge>{{ knowledgesCount }}</VenustBadge>
			</div>
			<div class='space-y-2'>
				<div v-for='knowledge in knowledges' class='rounded-lg border bg-neutral-100 px-4 py-2'>
					<div class='flex items-center space-x-4'>
						<LightBulbIcon class='h-4 w-4'/>
						<div class='flex justify-between items-center flex-1 space-x-4'>
							<VenustTooltip>
								<template #reference>
									<p class='font-semibold underline decoration-dashed underline-offset-2 decoration-1'>{{ knowledge.title }}</p>
								</template>
								<template #tooltip>
									{{ knowledge.purpose }}
								</template>
							</VenustTooltip>
							<div
								class='rounded border px-1 text-xs font-medium text-white bg-orange-600 border-orange-600'
								v-if='knowledge.type'>
								<p>{{ knowledge.type }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { DocumentTextIcon, LightBulbIcon } from '@heroicons/vue/24/outline/index.js';
import VenustTag from '@/components/venust/tag/venustTag.vue';
import { computed } from 'vue';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';
import VenustBadge from '@/components/venust/badge/venustBadge.vue';

const props = defineProps({
	topicObject: Object,
});

const title = computed(() => {
	return props.topicObject.title;
});

const knowledges = computed(() => {
	return props.topicObject.knowledges;
});

const knowledgesCount = computed(() => {
	return knowledges.value.length;
});

const areas = computed(() => {
	return props.topicObject.areas;
});
</script>
