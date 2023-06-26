<template>
	<VenustDropdown :options="dropdownOptions" :modifier="dropdownModifiers">
		<template #toggler>
			<div class="relative">
				<slot />
			</div>
		</template>
		<template #container>
			<div class="rounded-lg border bg-white shadow-lg">
				<div class="flex items-center justify-between p-4">
					<p class="font-bold">Languages</p>
				</div>
				<div
					class="max-h-[500px] divide-y overflow-auto border-t-2 p-2"
				>
					<div
						class="flex w-[200px] justify-between rounded bg-white p-2 text-sm hover:brightness-95"
						v-for="locale in SUPPORTED_LOCALES"
						:key="`locale-${locale}`"
						@click.prevent="setLocale(locale)"
					>
						<div
							class="rounded bg-neutral-300 px-1 text-neutral-500"
						>
							<p>{{ locale }}</p>
						</div>
						<div class="flex items-center">
							<p class="font-medium text-neutral-500">
								{{ $t(`locale.${locale}`) }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</template>
	</VenustDropdown>
</template>

<script setup>
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';
import { useSettingsStore } from '@/store/settings.js';
import { SUPPORTED_LOCALES } from '@/locale/index.js';

const settingsStore = useSettingsStore();
const { setLocale } = settingsStore;

const dropdownOptions = { placement: 'right' };
const dropdownModifiers = {
	name: 'flip',
	options: {
		fallbackPlacements: ['left', 'bottom', 'left'],
	},
};
</script>
