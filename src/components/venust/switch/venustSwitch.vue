<template>
	<div class="w-fit">
		<input
			type="checkbox"
			class="peer hidden"
			:id="`${name}-switch`"
			v-model="input"
			@change="sendParent"
		/>
		<label
			:for="`${name}-switch`"
			class="relative right-0 block h-2 w-9 rounded-full bg-neutral-300 before:absolute before:top-1/2 before:h-4 before:w-6 before:-translate-y-1/2 before:rounded-full before:border-[6px] before:border-neutral-500 before:bg-blue-300 before:shadow before:transition peer-checked:before:right-0 peer-checked:before:border-white peer-checked:before:bg-blue-600"
		></label>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['model']);
const props = defineProps({
	name: String,
});

const input = ref();
function sendParent() {
	emit('model', input.value);
}
</script>
