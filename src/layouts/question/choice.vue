<template>
	<div class="space-y-8 rounded-lg border bg-slate-50 px-6 py-4">
		<div class="space-y-2">
			<div
				class="w-fit rounded border px-1 text-sm font-medium text-neutral-500"
			>
				Multiple Choice
			</div>
			<p class="flex-1 text-justify font-medium">{{ description }}</p>
		</div>
		<div class="space-y-2">
			<div v-for="option in options">
				<input
					:id="`option-${option?.id}`"
					type="checkbox"
					class="peer hidden"
					v-model="input"
					:value="option?.id"
					@change="sendParent"
					:disabled="isWaitingResult"
				/>
				<label
					:for="`option-${option?.id}`"
					tabindex="0"
					class="block rounded-lg border bg-neutral-50 px-4 py-2 font-medium shadow-sm transition hover:brightness-95 active:scale-95 peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-blue-100"
				>
					{{ option.statement }}
				</label>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, inject, ref } from 'vue';

const emit = defineEmits(['model']);
const props = defineProps({
	question: Object,
});
const isWaitingResult = inject('isWaitingResult');

const description = computed(() => {
	return props.question?.description;
});

const options = computed(() => {
	return props.question?.options;
});

const input = ref([]);

function sendParent() {
	emit('model', input.value);
}
</script>
