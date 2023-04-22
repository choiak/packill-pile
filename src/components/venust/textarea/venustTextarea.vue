<template>
	<div class="flex items-center">
		<textarea
			class="min-h-fit w-full rounded-lg border border-gray-300 bg-neutral-50 px-3 py-2 shadow-sm focus:border focus:border-blue-600 focus:bg-white focus:shadow-lg focus:shadow-blue-100 focus:ring-0 active:ring-0"
			:required="required"
			:disabled="disabled"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			:cols="cols"
			:rows="rows"
			:maxlength="maxLength"
			:minlength="minLength"
			:spellcheck="spellcheck"
			:wrap="wrap"
			v-model="inputValue"
			@input="sendParent"
		/>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['model']);
const props = defineProps({
	required: Boolean,
	disabled: Boolean,
	cols: Number,
	rows: Number,
	maxLength: Number,
	minLength: Number,
	placeholder: String,
	autocomplete: String,
	spellcheck: String,
	wrap: String,
	defaultValue: String,
});

const inputValue = ref();
watch(props, (newValue) => {
	if (newValue.defaultValue) {
		inputValue.value = props.defaultValue;
	}
});

function sendParent() {
	emit('model', inputValue);
}
</script>
