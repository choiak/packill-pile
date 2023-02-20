<template>
  <div class="flex items-center" :class="{ 'flex-row-reverse': leftIcon }">
    <input
      :type="inputType"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="inputClass"
      :required="required"
      v-model="inputValue"
      @input="sendParent"
    />
    <div
      v-if="hasIcon"
      @click="show()"
      class="mt-1 border bg-neutral-200/40 py-2 px-2 shadow-sm"
      :class="[toggledStyles, toggleableStyles, buttonClass]"
    >
      <slot><EyeIcon class="h-6 w-6 text-gray-500" /></slot>
    </div>
  </div>
</template>

<script setup>
import { EyeIcon } from "@heroicons/vue/24/outline";
import { computed, reactive, ref } from "vue";

const inputValue = ref("");

const emit = defineEmits(["model"]);

const state = reactive({ isActive: false });

const props = defineProps({
  hasIcon: Boolean,
  leftIcon: Boolean,
  required: Boolean,
  inputClass: String,
  buttonClass: String,
  activeClass: String,
  inactiveClass: String,
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
  if (props.toggleable) {
    state.isActive = !state.isActive;
  }
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
