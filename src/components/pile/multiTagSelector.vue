<template>
	<div>
		<div v-for="tag in tags" :key="tag.value">
			<input
				type="checkbox"
				class="peer hidden"
				name="areas"
				:value="tag?.value"
				:id="`areas-checkbox-${tag.name}`"
				v-model="selectedTags"
				@change="sendParent"
			/>
			<VenustTag
				:label-for="`areas-checkbox-${tag.name}`"
				class="flex items-center space-x-0.5 border shadow hover:bg-blue-50 active:scale-95 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600"
				:id="`areas-label-${tag.name}`"
			>
				<PlusIcon
					class="h-3 w-3 transition"
					:class="{ 'rotate-45': selectedTags.includes(tag.value) }"
				/>
				<span>{{ tag.name }}</span>
			</VenustTag>
		</div>
	</div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline/index.js';
import VenustTag from '@/components/venust/tag/venustTag.vue';
import { ref } from 'vue';

const emit = defineEmits(['model']);
const props = defineProps({
	tags: undefined,
});

const selectedTags = ref([]);

function sendParent() {
	emit('model', selectedTags.value);
}
</script>
