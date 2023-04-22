<template>
	<VenustDropdown expand="right">
		<template #toggler>
			<button class="btn-menu flex items-center space-x-4">
				<SwatchIcon class="h-5 w-5" />
				<label>Swatch</label>
			</button>
		</template>
		<template #container>
			<div
				class="w-[200px] divide-y rounded-xl border bg-white shadow-lg"
			>
				<div
					class="flex items-center justify-between px-2 py-2 font-medium"
				>
					<div class="flex items-center space-x-1">
						<MoonIcon class="h-4 w-4 text-neutral-500" />
						<p class="text-neutral-700">Dark mode</p>
					</div>
					<VenustSwitch @model="getDarkMode" />
				</div>
				<div class="space-y-2 px-2 py-2">
					<p class="text-sm font-bold uppercase text-neutral-500">
						Palette
					</p>
					<div class="flex flex-wrap space-x-2">
						<button class="h-5 w-5 rounded-full bg-blue-600" />
						<button class="h-5 w-5 rounded-full bg-yellow-300" />
						<button class="h-5 w-5 rounded-full bg-emerald-200" />
						<button class="h-5 w-5 rounded-full bg-pink-200" />
						<button class="h-5 w-5 rounded-full bg-pink-200" />
					</div>
				</div>
				<div class="px-2 py-2 text-xs text-neutral-500">
					Powered by
					<strong>Venust UI</strong>
				</div>
			</div>
		</template>
	</VenustDropdown>
</template>

<script setup>
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';
import { SwatchIcon } from '@heroicons/vue/24/outline/index.js';
import { MoonIcon } from '@heroicons/vue/24/solid/index.js';
import VenustSwitch from '@/components/venust/switch/venustSwitch.vue';
import { ref } from 'vue';

const darkMode = ref();
function getDarkMode(value) {
	darkMode.value = value;
}
</script>
