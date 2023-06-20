<template>
<!--	<VenustCard>-->
<!--		<div class="space-y-4">-->
<!--			<div class="flex items-center space-x-1">-->
<!--				<VenustTag-->
<!--					v-for="area in areas"-->
<!--					:style="{-->
<!--						color: area.attributes.primaryColor,-->
<!--						background: area.attributes.secondaryColor,-->
<!--					}"-->
<!--				>-->
<!--					{{ area.attributes.name }}-->
<!--				</VenustTag>-->
<!--			</div>-->
<!--			<div class="space-y-1">-->
<!--				<h4 class="font-bold">{{ name }}</h4>-->
<!--				<p class="line-clamp-3 text-neutral-700">{{ description }}</p>-->
<!--			</div>-->
<!--			<div class="flex items-end justify-between">-->
<!--				<div class="grid grid-cols-2 gap-2 text-neutral-500">-->
<!--					<div class="flex items-center space-x-1">-->
<!--						<Square2StackIcon class="h-4 w-4" />-->
<!--						<label>-->
<!--							<strong>{{ partitions }}</strong>-->
<!--							Partitions-->
<!--						</label>-->
<!--					</div>-->
<!--					<div class="flex items-center space-x-1">-->
<!--						<DocumentTextIcon class="h-4 w-4" />-->
<!--						<label>-->
<!--							<strong>{{ topic }}</strong>-->
<!--							Topics-->
<!--						</label>-->
<!--					</div>-->
<!--					<div class="flex items-center space-x-1">-->
<!--						<WrenchScrewdriverIcon class="h-4 w-4" />-->
<!--						<label>-->
<!--							<strong>{{ projects }}</strong>-->
<!--							Projects-->
<!--						</label>-->
<!--					</div>-->
<!--					<div-->
<!--						class="flex items-center space-x-1"-->
<!--						v-if="certificated"-->
<!--					>-->
<!--						<TrophyIcon class="h-4 w-4" />-->
<!--						<label>Certificated</label>-->
<!--					</div>-->
<!--				</div>-->
<!--				<div>-->
<!--					<button-->
<!--						class="btn-accent flex items-center space-x-1 rounded-full"-->
<!--						@click.prevent='updateMyPackage(packageId)'-->
<!--					>-->
<!--						<CursorArrowRippleIcon class="h-5 w-5" />-->
<!--						<label>Unpack</label>-->
<!--					</button>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--	</VenustCard>-->
	<VenustCard>
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
				<h4 class="font-bold">{{ name }}</h4>
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
			</div>
<!--			<div-->
<!--				class="flex justify-between"-->
<!--				 v-if="certificated"-->
<!--			>-->
<!--				<div class="flex items-center space-x-1">-->
<!--					<TrophyIcon class="h-4 w-4" />-->
<!--					<label>Certificated</label>-->
<!--				</div>-->
<!--				<div>-->
<!--					<button-->
<!--						class="btn-accent flex items-center space-x-1 rounded-full"-->
<!--						@click.prevent='updateMyPackage(packageId)'-->
<!--					>-->
<!--						<CursorArrowRippleIcon class="h-5 w-5" />-->
<!--						<label>Unpack</label>-->
<!--					</button>-->
<!--				</div>-->
<!--			</div>-->
			<div class="relative h-6">
				<div class="absolute bottom-0 right-0">
					<button
						class="btn-accent flex items-center space-x-1 rounded-full"
						@click.prevent='updateMyPackage(packageId)'
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
import { getPackage } from '@/api/package.js';
import { computed, onUnmounted, ref } from 'vue';
import { updateMyPackage } from '@/api/me.js';

const props = defineProps({
	packageId: Number,
});

const packageResponse = getPackage(props.packageId, {
	populate: ['areas'],
});

const pack = computed(() => {
	return packageResponse.data.value?.data.attributes;
});

const name = computed(() => {
	return pack.value?.name;
});

const description = computed(() => {
	return pack.value?.description;
});

const certificated = computed(() => {
	return pack.value?.certificated;
});

const areas = computed(() => {
	return pack.value?.areas?.data;
});

const partitions = ref(7);
const topics = ref(330);
const projects = ref(15);

onUnmounted(() => {
	if (packageResponse.canAbort.value) {
		packageResponse.abort();
	}
});
</script>
