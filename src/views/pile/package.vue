<template>
	<Index>
		<div class='flex flex-col h-full w-full space-y-4 bg-white p-6 sm:p-8 sm:rounded-xl'>
			<div class='md:flex md:items-center md:justify-between space-y-2 md:space-y-0'>
				<div class='space-y-2'>
					<h3 class='font-semibold text-2xl md:text-3xl'>{{ packageName }}</h3>
					<div class='flex items-center space-x-1'>
						<div class='flex space-x-1'>
							<p v-for='area in packageAreas'
							   class='rounded px-2 text-xs font-medium text-white'
							   :style='`background: ${area.attributes.color}`'>
								{{ area.attributes.tag }}
							</p>
						</div>
					</div>
				</div>
				<button class='group btn-accent flex items-center space-x-1'>
					<CursorArrowRippleIcon class='h-4 w-4 animate-pulse'/>
					<label class='animate-pulse'>Unpack and start this package</label>
				</button>
			</div>
			<div class='flex-1 space-y-8 md:space-y-0 md:flex w-full rounded-xl border p-4 md:space-x-8 overflow-auto'>
				<div
					class='rounded-lg space-y-4 md:space-y-0 md:w-1/2 lg:w-1/3 md:flex md:flex-col md:justify-between bg-gradient-to-tr from-neutral-700 to-purple-300 rounded-lg p-4 shadow-lg'>
					<div class='grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-y-2 justify-between'>
						<div>
							<h4 class='font-medium capitalize text-white'>{{ packageState }}</h4>
							<div class='text-sm font-medium text-neutral-100'>State</div>
						</div>
						<div>
							<h4 class='font-medium capitalize text-white'>227</h4>
							<div class='text-sm font-medium text-neutral-100'>Topics</div>
						</div>
						<div>
							<h4 class='font-medium capitalize text-white'>15</h4>
							<div class='text-sm font-medium text-neutral-100'>Available projects</div>
						</div>
						<div v-if='packageHasCertificate'>
							<h4 class='font-medium capitalize text-white'>Certificate</h4>
							<div class='text-sm font-medium text-neutral-100'>Available</div>
						</div>
					</div>
					<p class='text-white font-medium'>
						{{ packageDescription }}
					</p>
				</div>
				<div class='flex-1 space-y-8 overflow-auto'>
					<div class='space-y-2'>
						<h5
							class='rounded-lg bg-blue-600 px-4 py-1 uppercase font-semibold tracking-widest text-white md:w-fit md:px-2 md:py-0 w-full'
						>
							Learning Objective
						</h5>
						<div v-html='packageObjective' class='prose-article border rounded-lg p-4' />
					</div>
					<div class='space-y-2'>
						<h5
							class='rounded-lg bg-blue-600 px-4 py-1 uppercase font-semibold tracking-widest text-white md:w-fit md:px-2 md:py-0 w-full'
						>
							Topics Covered
						</h5>
						<div class='border rounded-lg p-4'>
							TODO
						</div>
					</div>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import Index from '@/layouts/workspace/index.vue';
import { CursorArrowRippleIcon } from '@heroicons/vue/24/outline/index.js';
import { useRoute } from 'vue-router';
import { getPackage } from '@/api/workspace.js';
import { computed } from 'vue';
import * as MarkdownIt from 'markdown-it';

const route = useRoute();

const packageId = route.params.id;

const packageObject = await getPackage(packageId);
const packageName = computed(() => {
	return packageObject.attributes.Name;
});

const packageDescription = computed(() => {
	return packageObject.attributes.Description;
});

const packageHasCertificate = computed(() => {
	return packageObject.attributes.Certificate;
});

const packageState = computed(() => {
	return packageObject.attributes.State;
});

const packageAreas = computed(() => {
	return packageObject.attributes.areas.data
})

const packageObjective = computed(() => {
	const md = new MarkdownIt();

	if (packageObject.attributes.objective) {
		return md.render(packageObject.attributes.objective);
	} else {
		return 'Coming Soon';
	}
});
</script>

