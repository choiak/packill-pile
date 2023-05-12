<template>
	<div class='flex w-max flex-col space-y-2'>
		<button class='btn-menu flex items-center space-x-4'>
			<BellIcon class='h-5 w-5' />
		</button>
		<Swatch />
		<router-link to='/settings'>
			<button class='btn-menu flex items-center space-x-4'>
				<Cog6ToothIcon class='h-5 w-5' />
			</button>
		</router-link>
		<button class='btn-menu-secondary flex items-center space-x-4' @click.prevent='logout'>
			<ArrowLeftOnRectangleIcon class='h-5 w-5' />
		</button>
	</div>
</template>

<script setup>
import { Cog6ToothIcon, BellIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline';
import Swatch from '@/layouts/utils/swatch.vue';
import { logout } from '@/api/auth.js';
</script>
