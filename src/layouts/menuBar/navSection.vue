<template>
	<div class="flex w-max flex-col space-y-2">
		<router-link to="/dashboard">
			<button class='btn-menu-secondary flex items-center space-x-4'>
				<RectangleGroupIcon class="h-5 w-5" />
			</button>
		</router-link>
		<router-link to="/packages">
			<button class="btn-menu flex items-center space-x-4">
				<Square3Stack3DIcon class="h-5 w-5" />
			</button>
		</router-link>
	</div>
</template>

<script setup>
import {
	RectangleGroupIcon,
	Square3Stack3DIcon,
} from '@heroicons/vue/24/outline';
</script>
