<template>
	<Index>
		<div class='flex flex-col h-full w-full space-y-4 rounded-xl bg-white p-8'>
			<div class='space-y-1'>
				<h3 class='font-semibold'>Packages</h3>
				<div class='flex items-center space-x-1'>
					<p
						class='text-sm font-medium text-neutral-500'
					>
						Achieve your learning goal by choosing the right package
					</p>
				</div>
			</div>
			<div class='flex-1 flex flex-col w-full rounded-lg border p-4 space-y-4 overflow-auto'>
				<div class='flex justify-between'>
					<form>
						<fieldset class='space-y-1'>
							<legend class='text-sm font-medium text-neutral-500'>Area</legend>
							<div class='flex space-x-1'>
								<div>
									<input type='radio' class='peer h-0 w-0 invisible' name='area' value='all' id='area-radio-all'
										   v-model='areaFilter' @change='filterPackages(areaFilter); updateTagColorOnChecked()' checked />
									<label for='area-radio-all'
										   class='rounded border px-2 font-medium peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-0 transition'>All</label>
								</div>
								<div v-for='area in areas'>
									<input type='radio' class='peer h-0 w-0 invisible' name='area'
										   :value='area.attributes.tag'
										   :id='`area-radio-${ area.attributes.tag }`'
										   v-model='areaFilter'
										   @change='filterPackages(areaFilter); updateTagColorOnChecked(area.attributes.color)'
									/>
									<label :id='`area-label-${ area.attributes.tag }`'
										   :for='`area-radio-${ area.attributes.tag }`'
										   class='rounded border px-2 font-medium peer-checked:text-white peer-checked:border-0 transition'
									>{{ area.attributes.tag }}</label>
								</div>
							</div>
						</fieldset>
					</form>

				</div>
				<div class='flex-1 space-y-4 overflow-auto'>
					<div v-for='(pack) in packagesFiltered'
						 class='w-full p-4 space-y-4 rounded-lg bg-slate-50 shadow border'
					>
						<div class='md:flex justify-between items-center'>
							<div class='flex items-center'>
								<h4 class='font-medium'>{{ pack.attributes.Name }}</h4>
							</div>
							<div class='flex space-x-1'>
								<p v-for='area in pack.attributes.areas.data'
								   class='rounded px-2 text-xs font-medium text-white'
								   :style='`background: ${area.attributes.color}`'>
									{{ area.attributes.tag }}
								</p>
							</div>
						</div>
						<p class='font-text'>{{ pack.attributes.Description }}</p>
						<div class='sm:flex sm:space-x-8'>
							<div>
								<h5 class='font-semibold'>7</h5>
								<p class='text-sm font-medium text-neutral-500'>Partitions</p>
							</div>
							<div>
								<h5 class='font-semibold'>332</h5>
								<p class='text-sm font-medium text-neutral-500'>Topics</p>
							</div>
							<div>
								<h5 class='font-semibold'>15</h5>
								<p class='text-sm font-medium text-neutral-500'>Projects</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import Index from '@/layouts/pile/index.vue';
import { listAreas, listPackages } from '@/api/workspace.js';
import { ref } from 'vue';

const areas = await listAreas();
const packages = await listPackages();
const areaFilter = ref('all');
const packagesFiltered = ref(packages);

function filterPackages(condition) {
	if (areaFilter.value !== 'all') {
		packagesFiltered.value = packages.filter((pack) => pack.attributes.areas.data.some(area => area.attributes.tag === condition));
	} else {
		packagesFiltered.value = packages;
	}
}

function updateTagColorOnChecked(color) {
	const labels = document.querySelectorAll('[id^="area-label"]');

	labels.forEach(label => {
		if (document.getElementById(label.htmlFor).checked === true) {
			label.style.background = color;
		} else {
			label.style.background = 'white';
		}
	})
}
</script>
