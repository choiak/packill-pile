<template>
	<VenustDropdown>
		<template #toggler>
			<slot />
		</template>
		<template #container>
			<div
				class="relative flex w-[300px] items-start justify-between space-x-4 rounded-lg border bg-white p-2 shadow-sm"
			>
				<div class="space-y-2">
					<div>
						<div v-if="isLoading" class="space-y-1">
							<div
								class="h-3.5 w-20 animate-pulse rounded bg-slate-200"
							/>
							<div
								class="h-3 w-12 animate-pulse rounded bg-sky-200"
							/>
						</div>
						<div v-else>
							<p class="text-sm font-bold">{{ displayName }}</p>
							<router-link
								class="flex items-center space-x-0.5"
								:to="`/users/${username}`"
							>
								<AtSymbolIcon class="h-3 w-3 text-sky-800" />
								<p class="text-xs font-medium text-sky-800">
									{{ username }}
								</p>
							</router-link>
						</div>
					</div>
					<div>
						<div
							v-if="isLoading"
							class="h-14 w-48 animate-pulse rounded bg-slate-200"
						/>
						<p class="text-justify text-xs" v-else>{{ bio }}</p>
					</div>
					<div>
						<div
							class="h-3.5 w-8 animate-pulse rounded bg-slate-200"
							v-if="isLoading"
						/>
						<div
							class="w-fit rounded border px-1 text-xs font-medium text-neutral-500"
							v-else
						>
							{{ roleName }}
						</div>
					</div>
				</div>
				<div class="flex flex-col justify-between space-y-2">
					<VenustAvatar :user-id="propUserId" size="sm" />
				</div>
				<router-link
					:to="`/users/${username}`"
					class="absolute bottom-2 right-2"
					v-if="!isLoading"
				>
					<button class="btn-accent p-1">
						<ArrowUpRightIcon class="h-5 w-5" />
					</button>
				</router-link>
			</div>
		</template>
	</VenustDropdown>
</template>

<script setup>
import { getUserById } from '@/api/user.js';
import { computed, onUnmounted, watch } from 'vue';
import {
	AtSymbolIcon,
	ArrowUpRightIcon,
} from '@heroicons/vue/24/outline/index.js';
import VenustAvatar from '@/components/venust/avatar/venustAvatar.vue';
import VenustDropdown from '@/components/venust/dropdown/venustDropdown.vue';

const props = defineProps({
	userId: Number,
});

const propUserId = computed(() => {
	return props.userId;
});

let userResponse = getUserById(
	propUserId,
	{
		populate: {
			role: {
				fields: ['name'],
			},
		},
	},
	{ immediate: false },
);

if (propUserId.value) {
	userResponse.execute();
}

watch(propUserId, (newUserId) => {
	if (newUserId) {
		userResponse.execute();
	}
});

const isLoading = computed(() => {
	return (
		userResponse.isFetching.value ||
		(!userResponse.isFetching.value && !userResponse.isFinished.value) ||
		!propUserId.value
	);
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

onUnmounted(() => {
	if (userResponse.canAbort.value) {
		userResponse.abort();
	}
});
</script>
