<template>
	<div class='flex items-center'>
		<textarea class='rounded-lg w-full min-h-fit border border-gray-300 bg-neutral-200/40 px-3 py-2 shadow-sm focus:border focus:border-blue-600 focus:bg-white focus:shadow-lg focus:shadow-blue-100 focus:ring-0 active:ring-0'
				  :required='required'
				  :disabled='disabled'
				  :placeholder='placeholder'
				  :autocomplete='autocomplete'
				  :cols='cols'
				  :rows='rows'
				  :maxlength='maxLength'
				  :minlength='minLength'
				  :spellcheck='spellcheck'
				  :wrap='wrap'
				  v-model="inputValue"
				  @input='sendParent'
		/>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['model'])
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
})

const inputValue = ref(props.defaultValue)

function sendParent() {
	emit('model', inputValue)
}

</script>
