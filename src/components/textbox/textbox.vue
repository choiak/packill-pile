<template>
  <div class="flex items-center">
    <input
      :type="inputType"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="inputClass"
      :required="required"
      v-model="inputValue"
      @change="sendParent"
    />
    <div
      v-if="hasIcon"
      @click="show()"
      class="mt-1 rounded-r-lg border border-l-0 bg-neutral-200/40 py-2 px-2 shadow-sm hover:bg-white"
      :class="buttonClass"
    >
      <slot name="icon"><EyeIcon class="h-6 w-6 text-gray-500" /></slot>
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
  required: Boolean,
  inputClass: String,
  activeClass: String,
  inactiveClass: String,
  placeholder: String,
  autocomplete: String,
  defaultType: String,
  toggledType: String,
});

function sendParent() {
  emit("model", inputValue.value);
}

function show() {
  state.isActive = !state.isActive;
}

const inputType = computed(() => {
  switch (state.isActive) {
    case true:
      return props.toggledType;
    default:
      return props.defaultType;
  }
});

const buttonClass = computed(() => {
  switch (state.isActive) {
    case true:
      return "bg-white shadow-blue-100 border-blue-600";
    default:
      return "bg-neutral-200/40 border-gray-300";
  }
});
</script>
