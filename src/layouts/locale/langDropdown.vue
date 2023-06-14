<template>
	<VenustDropdown :options='dropdownOptions' :modifier='dropdownModifiers'>
		<template #toggler>
			<div class='relative'>
				<slot />
			</div>
		</template>
		<template #container>
			<div class='rounded-lg shadow-lg bg-white border'>
				<div class='flex items-center justify-between p-4'>
					<p class='font-bold'>Languages</p>
				</div>
				<div class='border-t-2 p-2 overflow-auto max-h-[500px] divide-y'>
					<div class='bg-white flex text-sm justify-between p-2 w-[200px] rounded hover:brightness-95'
						 v-for='locale in $i18n.availableLocales' :key='`locale-${locale}`'
						 @click.prevent='$i18n.locale = locale'>
						<div class='bg-neutral-300 text-neutral-500 rounded px-1 '>
							<p>{{ locale }}</p>
						</div>
						<div class='flex items-center'>
							<p class='font-medium text-neutral-500'>{{ $t(`locale.${locale}`)}}</p>
						</div>
					</div>
				</div>
			</div>
		</template>
	</VenustDropdown>
</template>

<script setup>
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';

const dropdownOptions = { placement: 'right' };
const dropdownModifiers = {
	name: 'flip',
	options: {
		fallbackPlacements: ['left', 'bottom', 'left'],
	},
};
</script>
