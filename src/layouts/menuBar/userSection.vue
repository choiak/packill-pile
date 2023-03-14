<template>
	<div class="flex w-max flex-col space-y-2 rounded-xl bg-white p-2">
		<img
			src="@/assets/img/OIP.jpeg"
			class="h-9 w-9 rounded-lg border shadow"
		/>
		<button class="btn-menu">
			<BellIcon class="h-5 w-5" />
		</button>
		<button class="btn-menu">
			<SwatchIcon class="h-5 w-5" />
		</button>
		<button class="btn-menu">
			<Cog6ToothIcon class="h-5 w-5" />
		</button>
	</div>
</template>

<script setup>
import { Cog6ToothIcon, SwatchIcon, BellIcon } from '@heroicons/vue/24/outline';
import { useUserStore } from '@/store/index.js';

const userStore = useUserStore();
</script>
