<template>
	<div class="flex items-center" :class="{ 'flex-row-reverse': leftIcon }">
		<input
			:type="inputType"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			class="input disabled:cursor-not-allowed disabled:brightness-90 peer"
			:class="inputClass"
			:required="required"
			:disabled="disabled"
			v-model="input"
			@input="sendParent"
		/>
		<div
			v-if="hasIcon"
			@click="show()"
			class="border bg-neutral-50 px-2 py-2 shadow-sm peer-disabled:brightness-95 peer-disabled:cursor-not-allowed"
			:class="[toggledStyles, toggleableStyles, buttonClass]"
		>
			<slot><EyeIcon class="h-6 w-6 text-gray-500" /></slot>
		</div>
	</div>
</template>

<script setup>
import { EyeIcon } from '@heroicons/vue/24/outline';
import { computed, reactive, ref, watch } from 'vue';

const emit = defineEmits(['model']);
const props = defineProps({
	hasIcon: Boolean,
	leftIcon: Boolean,
	toggleable: Boolean,
	required: Boolean,
	disabled: Boolean,
	defaultValue: String,
	inputClass: String,
	buttonClass: String,
	placeholder: String,
	autocomplete: String,
	defaultType: String,
	toggledType: String,
});

const input = ref();
watch(props, (newValue) => {
	if (newValue.defaultValue) {
		input.value = props.defaultValue;
	}
});

const state = reactive({ isActive: false });

function sendParent() {
	emit('model', input.value);
}

function show() {
	state.isActive = props.toggleable ? !state.isActive : false;
}

const inputType = computed(() => {
	switch (state.isActive) {
		case true:
			return props.toggledType;
		default:
			return props.defaultType;
	}
});

const toggleableStyles = computed(() => {
	switch (props.toggleable) {
		case true:
			return 'hover:bg-white';
		default:
			return '';
	}
});

const toggledStyles = computed(() => {
	switch (state.isActive) {
		case true:
			return 'bg-white shadow-blue-100 border-blue-600';
		default:
			return 'bg-neutral-200/40 border-gray-300';
	}
});
</script>
