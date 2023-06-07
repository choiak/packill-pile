<template>
	<div class='space-y-8'>
		<div class='flex items-start justify-between'>
			<div class='flex items-start space-x-4'>
				<div class='rounded-full border border-blue-600 bg-white p-2'>
					<UserIcon class='h-4 w-4' />
				</div>
				<div>
					<h6 class='font-semibold text-neutral-700'>{{ displayName }}</h6>
					<div class='flex items-center space-x-1'>
						<AtSymbolIcon
							class='h-4 w-4 text-neutral-500'
						/>
						<p class='text-sm text-neutral-700'>{{ username }}</p>
					</div>
				</div>
			</div>
			<div>
				<router-link :to='`/users/${username}`'>
					<VenustAvatar :user-id='id' size='xs' />
				</router-link>
			</div>
		</div>
		<div class='px-4 py-2 border rounded-lg bg-neutral-100 w-full space-y-4'>

		</div>
		<div class='space-y-1'>
			<div class='flex items-center justify-between'>
				<p class='uppercase text-sm text-neutral-500 font-bold'>Location</p>
				<MapPinIcon class='h-4 w-4 text-neutral-500' />
			</div>
			<p class='text-sm font-bold text-neutral-500 capitalize'>
				{{ location }}
			</p>
		</div>
		<div class='space-y-1' v-if='birthday'>
			<div class='flex items-center justify-between'>
				<p class='uppercase text-sm text-neutral-500 font-bold'>Birthday</p>
				<CakeIcon class='h-4 w-4 text-neutral-500' />
			</div>
			<p class='text-sm font-bold text-neutral-500 capitalize'>
				{{ birthdayDateString }}
			</p>
		</div>
		<div class='space-y-2'>
			<div class='flex items-center justify-between'>
				<p class='uppercase text-sm text-neutral-500 font-bold'>Contact details</p>
				<ChatBubbleOvalLeftEllipsisIcon class='h-4 w-4 text-neutral-500' />
			</div>
			<div class='flex items-center space-x-1'>
				<VenustTooltip>
					<template #reference>
						<AtSymbolIcon
							class='h-5 w-5 text-neutral-500'
						/>
					</template>
					<template #tooltip>
						Packill ID
					</template>
				</VenustTooltip>
				<p>{{ username }}</p>
			</div>
			<div class='flex items-center space-x-1'>
				<VenustTooltip>
					<template #reference>
						<EnvelopeIcon
							class='h-5 w-5 text-neutral-500'
						/>
					</template>
					<template #tooltip>
						Email
					</template>
				</VenustTooltip>
				<a
					:href='`mailto:${email}`'
					class='text-sky-800'
				>
					{{ email }}
				</a>
			</div>
		</div>
		<div class='space-y-2' v-if='bio'>
			<div class='flex items-center justify-between'>
				<p class='uppercase text-sm text-neutral-500 font-bold'>Biography</p>
			</div>
			<p class='text-sm font-medium text-neutral-500 text-justify'>
				{{ bio }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { MapPinIcon, AtSymbolIcon, UserIcon, CakeIcon, EnvelopeIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline/index.js';
import { computed } from 'vue';
import VenustAvatar from '@/components/venust/avatar/venustAvatar.vue';
import moment from 'moment';
import VenustTooltip from '@/components/venust/tooltip/venustTooltip.vue';

const props = defineProps({
	userObject: Object,
});

const id = computed(() => {
	return props.userObject.id;
});

const displayName = computed(() => {
	return props.userObject.displayName;
});

const username = computed(() => {
	return props.userObject.username;
});

const bio = computed(() => {
	return props.userObject.bio;
});

const location = computed(() => {
	return props.userObject.location;
});

const email = computed(() => {
	return props.userObject.email;
});

const birthday = computed(() => {
	if (props.userObject.birthday) {
		return new Date(props.userObject.birthday);
	}
});

const birthdayDateString = computed(() => {
	if (birthday.value) {
		return moment(birthday.value).format('L');
	}
});
</script>