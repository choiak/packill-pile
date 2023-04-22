<template>
	<VenustCard :to="to">
		<div class="space-y-4">
			<div class="flex items-center space-x-1">
				<VenustTag
					v-for="area in areas"
					:style="{
						color: area.attributes.primaryColor,
						background: area.attributes.secondaryColor,
					}"
				>
					{{ area.attributes.name }}
				</VenustTag>
			</div>
			<div class="space-y-1">
				<h4 class="font-bold">{{ title }}</h4>
				<p class="line-clamp-3 text-neutral-700">{{ description }}</p>
			</div>
			<div class="flex items-end justify-between">
				<div class="grid grid-cols-2 gap-2 text-neutral-500">
					<div class="flex items-center space-x-1">
						<Square2StackIcon class="h-4 w-4" />
						<label>
							<strong>{{ partitions }}</strong>
							Partitions
						</label>
					</div>
					<div class="flex items-center space-x-1">
						<DocumentTextIcon class="h-4 w-4" />
						<label>
							<strong>{{ topics }}</strong>
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
						v-if="certificated"
					>
						<TrophyIcon class="h-4 w-4" />
						<label>Certificated</label>
					</div>
				</div>
				<div>
					<button
						class="btn-accent flex items-center space-x-1 rounded-full"
						@click.prevent
					>
						<CursorArrowRippleIcon class="h-5 w-5" />
						<label>Unpack</label>
					</button>
				</div>
			</div>
		</div>
	</VenustCard>
</template>

<script setup>
import VenustCard from '@/components/venust/card/venustCard.vue';
import {
	CursorArrowRippleIcon,
	DocumentTextIcon,
	Square2StackIcon,
	TrophyIcon,
	WrenchScrewdriverIcon,
} from '@heroicons/vue/24/outline/index.js';
import VenustTag from '@/components/venust/tag/venustTag.vue';

const props = defineProps({
	to: String,
	title: String,
	description: String,
	areas: Array,
	partitions: Number,
	topics: Number,
	projects: Number,
	certificated: Boolean,
});
</script>
