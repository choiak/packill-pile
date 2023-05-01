<template>
	<div class="flex w-max flex-col space-y-2">
		<VenustDropdown>
			<img
				src="@/assets/img/OIP.jpeg"
				class="h-9 w-9 rounded-lg border shadow"
			/>
			<Transition name="fade">
				<VenustDropdownContainer expand="right" alignment="top">
					<ProfileCard user-id="me" />
				</VenustDropdownContainer>
			</Transition>
		</VenustDropdown>
		<button class="btn-menu flex items-center space-x-4">
			<BellIcon class="h-5 w-5" />
			<label>Notifications</label>
		</button>
		<Swatch />
		<router-link to="/settings">
			<button class="btn-menu flex items-center space-x-4">
				<Cog6ToothIcon class="h-5 w-5" />
				<label>Settings</label>
			</button>
		</router-link>
	</div>
</template>

<script setup>
import { Cog6ToothIcon, SwatchIcon, BellIcon } from '@heroicons/vue/24/outline';
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';
import VenustDropdownContainer from '@/components/venust/dropdown/venustDropdownContainer.vue';
import ProfileCard from '@/layouts/user/profileCard.vue';
import Swatch from '@/layouts/utils/swatch.vue';
</script>
