<template>
	<div>
		<div v-for="area in areas" :key="area.id">
			<input
				type="checkbox"
				class="peer hidden"
				name="areas"
				:value="area.id"
				:id="`areas-checkbox-${area?.attributes?.name}`"
				v-model="selectedAreas"
				@change="
					sendParent();
					updateTagColor(
						area?.attributes?.name,
						area?.attributes?.primaryColor,
						area?.attributes?.secondaryColor,
					);
				"
			/>
			<VenustTag
				:label-for="`areas-checkbox-${area?.attributes?.name}`"
				class="flex items-center space-x-0.5 border shadow"
				:id="`areas-label-${area?.attributes?.name}`"
			>
				<PlusIcon
					class="h-3 w-3 transition"
					:class="{ 'rotate-45': selectedAreas.includes(area.id) }"
				/>
				<span>{{ area.attributes.name }}</span>
			</VenustTag>
		</div>
	</div>
</template>

<script setup>
import VenustTag from '@/components/venust/tag/venustTag.vue';
import { PlusIcon } from '@heroicons/vue/24/outline/index.js';
import { computed, ref, toRefs, watch } from 'vue';
import { listAreas } from '@/api/workspace.js';
const emit = defineEmits(['model']);

const areaResponse = listAreas();
const areas = computed(() => {
	return areaResponse.data?.value?.data;
});
const selectedAreas = ref([]);

function updateTagColor(tagName, textColor, bgColor) {
	const label = document.getElementById(`areas-label-${tagName}`);
	const labelAttributes = label.attributes;
	const input = document.getElementById(labelAttributes.for.value);

	if (input.checked === true) {
		label.style.background = bgColor;
		label.style.borderColor = textColor;
		label.style.color = textColor;
	} else {
		label.style.background = 'white';
		label.style.borderColor = 'inherit';
		label.style.color = 'black';
	}
}

function sendParent() {
	emit('model', selectedAreas.value);
}
</script>
