<template>
  <div class="flex items-center" :class="{ 'flex-row-reverse': leftIcon }">
    <input
      :type="inputType"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="w-full border border-gray-300 bg-neutral-200/40 px-3 py-2 shadow-sm focus:border focus:border-blue-600 focus:bg-white focus:shadow-lg focus:shadow-blue-100 focus:ring-0 active:ring-0"
      :class="inputClass"
      :required="required"
      v-model="inputValue"
      @input="sendParent"
    />
    <div
      v-if="hasIcon"
      @click="show()"
      class="border bg-neutral-200/40 py-2 px-2 shadow-sm"
      :class="[toggledStyles, toggleableStyles, buttonClass]"
    >
      <slot><EyeIcon class="h-6 w-6 text-gray-500" /></slot>
    </div>
  </div>
</template>

<script setup>
import { EyeIcon } from "@heroicons/vue/24/outline";
import { computed, reactive, ref } from "vue";

const emit = defineEmits(["model"]);
const inputValue = ref("");
const state = reactive({ isActive: false });
const props = defineProps({
  hasIcon: Boolean,
  leftIcon: Boolean,
  required: Boolean,
  inputClass: String,
  buttonClass: String,
  placeholder: String,
  autocomplete: String,
  defaultType: String,
  toggledType: String,
  toggleable: Boolean,
});

function sendParent() {
  emit("model", inputValue.value);
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
      return "hover:bg-white";
    default:
      return "";
  }
});

const toggledStyles = computed(() => {
  switch (state.isActive) {
    case true:
      return "bg-white shadow-blue-100 border-blue-600";
    default:
      return "bg-neutral-200/40 border-gray-300";
  }
});
</script>
