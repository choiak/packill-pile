<template>
	<VenustDropdown>
		<template #toggler>
			<slot />
		</template>
		<template #container>
			<div
				class='relative flex items-start justify-between border shadow-sm rounded-lg bg-white p-2 w-[300px] space-x-4'>
				<div class='space-y-2'>
					<div>
						<div v-if='isLoading' class='space-y-1'>
							<div class='animate-pulse bg-slate-200 rounded w-20 h-3.5' />
							<div class='animate-pulse bg-sky-200 rounded w-12 h-3' />
						</div>
						<div v-else>
							<p class='font-bold text-sm'>{{ displayName }}</p>
							<router-link class='flex items-center space-x-0.5' :to='`/users/${username}`'>
								<AtSymbolIcon
									class='h-3 w-3 text-sky-800'
								/>
								<p class='text-xs text-sky-800 font-medium'>{{ username }}</p>
							</router-link>
						</div>
					</div>
					<div>
						<div v-if='isLoading' class='animate-pulse bg-slate-200 rounded w-48 h-14'/>
						<p class='text-xs text-justify' v-else>{{ bio }}</p>
					</div>
					<div>
						<div class='animate-pulse bg-slate-200 rounded w-8 h-3.5' v-if='isLoading'/>
						<div
							class='rounded border px-1 text-xs font-medium text-neutral-500 w-fit'
							v-else
						>
							{{ roleName }}
						</div>
					</div>
				</div>
				<div class='flex flex-col justify-between space-y-2 '>
					<VenustAvatar :user-id='propUserId' size='sm' />
				</div>
				<router-link :to='`/users/${username}`' class='absolute bottom-2 right-2' v-if='!isLoading'>
					<button class='btn-accent p-1'>
						<ArrowUpRightIcon class='w-5 h-5' />
					</button>
				</router-link>
			</div>
		</template>
	</VenustDropdown>
</template>

<script setup>
import { getUserById } from '@/api/user.js';
import { computed, watch } from 'vue';
import { AtSymbolIcon, ArrowUpRightIcon } from '@heroicons/vue/24/outline/index.js';
import VenustAvatar from '@/components/venust/avatar/venustAvatar.vue';
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';

const props = defineProps({
	userId: Number,
});

const propUserId = computed(() => {
	return props.userId;
});

let userResponse = getUserById(propUserId, {
	populate: {
		role: {
			fields: ['name'],
		},
	},
}, { immediate: false });

if (propUserId.value) {
	userResponse.execute();
}

watch(propUserId, (newUserId) => {
	if (newUserId) {
		userResponse.execute();
	}
});

const isLoading = computed(() => {
	return userResponse.isFetching.value || (!userResponse.isFetching.value && !userResponse.isFinished.value) || !propUserId.value;
});

const user = computed(() => {
	return userResponse.data.value;
});

const username = computed(() => {
	return user.value?.username;
});

const displayName = computed(() => {
	return user.value?.displayName;
});

const bio = computed(() => {
	return user.value?.bio;
});

const role = computed(() => {
	return user.value?.role;
});

const roleName = computed(() => {
	return role.value?.name;
});
</script>
