<template>
	<Index>
		<div class="flex h-full flex-col">
			<Dock>
				<div>
					<h5 class="font-medium">Member Profile</h5>
					<div class="flex items-center space-x-0.5 text-sm">
						<p>Users</p>
						<ChevronRightIcon class="h-4 w-4 text-neutral-500" />
						<AtSymbolIcon class="h-4 w-4 text-neutral-500" />
						<p>{{ username }}</p>
					</div>
				</div>
			</Dock>
			<div class="flex flex-1 space-x-4 overflow-auto p-6">
				<div
					class="h-fit w-[500px] overflow-auto rounded-xl border bg-white p-8"
				>
					<div class="space-y-8">
						<img
							src="@/assets/img/gradient.jpg"
							class="h-[300px] rounded-xl"
							alt="placeholder"
						/>
						<div class="space-y-2">
							<h3 class="font-semibold">
								{{ displayName }}
							</h3>
							<div class="flex items-center space-x-1">
								<MapPinIcon class="h-4 w-4 text-neutral-500" />
								<a
									target="_blank"
									class="text-sm font-medium text-sky-800"
									:href="`https://www.google.com/maps/search/${location}`"
								>
									{{ location }}
								</a>
							</div>
						</div>
						<div class="space-y-2">
							<p
								class="text-sm font-semibold uppercase text-neutral-500"
							>
								Contact Details
							</p>
							<div class="flex items-center space-x-1">
								<AtSymbolIcon
									class="h-5 w-5 text-neutral-500"
								/>
								<p>{{ username }}</p>
							</div>
							<div class="flex items-center space-x-1">
								<EnvelopeIcon
									class="h-5 w-5 text-neutral-500"
								/>
								<a
									:href="`mailto:${email}`"
									class="text-sky-800"
								>
									{{ email }}
								</a>
							</div>
						</div>
						<div class="space-y-2" v-if="bio">
							<h6
								class="text-sm font-semibold uppercase text-neutral-500"
							>
								Personal Biography
							</h6>
							<p>{{ bio }}</p>
						</div>
						<div class="space-y-2" v-if="birthday">
							<h6
								class="text-sm font-semibold uppercase text-neutral-500"
							>
								Birthday
							</h6>
							<div class="flex items-center space-x-1">
								<CakeIcon class="h-5 w-5 text-neutral-500" />
								<p>{{ birthdayDateString }}</p>
							</div>
						</div>
					</div>
				</div>
				<div
					class="flex flex-1 flex-col space-y-8 overflow-auto rounded-xl border bg-white p-8"
				>
					<div class="flex items-baseline space-x-4">
						<router-link
							:to="`/users/${username}/activities`"
							class="relative before:absolute before:-bottom-2 before:left-1/2 before:h-1 before:w-4 before:-translate-x-1/2 before:rounded-full before:bg-blue-600"
							:class="{
								'text-2xl font-bold':
									route.path ===
									`/users/${username}/activities`,
								'before:hidden':
									route.path !==
									`/users/${username}/activities`,
							}"
						>
							Activities
						</router-link>
						<router-link
							:to="`/users/${username}/projects`"
							class="relative before:absolute before:-bottom-2 before:left-1/2 before:h-1 before:w-4 before:-translate-x-1/2 before:rounded-full before:bg-blue-600"
							:class="{
								'text-2xl font-bold':
									route.path ===
									`/users/${username}/projects`,
								'before:hidden':
									route.path !==
									`/users/${username}/projects`,
							}"
						>
							Projects
						</router-link>
					</div>
					<div class="flex-1 overflow-auto">
						<router-view :user-id="id" />
					</div>
				</div>
				<div class="h-fit w-[250px] rounded-xl border bg-white">
					<div
						class="flex items-center justify-between border-b px-4 py-2"
					>
						<label
							class="text-sm font-bold uppercase text-neutral-500"
						>
							Statistics
						</label>
						<div class="flex items-center space-x-1">
							<ChartPieIcon class="h-5 w-5 text-neutral-500" />
						</div>
					</div>
					<div class="p-4"></div>
				</div>
			</div>
		</div>
	</Index>
</template>

<script setup>
import Index from '@/layouts/utils/index.vue';
import { useRoute } from 'vue-router';
import { getUserByUsername } from '@/api/user.js';
import Dock from '@/layouts/dock/dock.vue';
import { ChartPieIcon } from '@heroicons/vue/24/solid/index.js';
import {
	AtSymbolIcon,
	CakeIcon,
	EnvelopeIcon,
	MapPinIcon,
	ChevronRightIcon,
} from '@heroicons/vue/24/outline';
import { computed, onUnmounted, watch } from 'vue';
import moment from 'moment';

const route = useRoute();
const paramUsername = computed(() => {
	return route.params.username;
});

const userResponse = getUserByUsername(
	paramUsername,
	{
		populate: ['avatar', 'role', 'currentPackage'],
	},
	{ immediate: false },
);

if (paramUsername.value) {
	userResponse.execute();
}

watch(paramUsername, (newUsername) => {
	if (newUsername) {
		userResponse.execute();
	}
});

const user = computed(() => {
	if (userResponse.data.value) {
		return userResponse.data.value[0];
	}
});

const id = computed(() => {
	return user.value?.id;
});

const username = computed(() => {
	return user.value?.username;
});

const displayName = computed(() => {
	return user.value?.displayName;
});

const location = computed(() => {
	return user.value?.location;
});

const email = computed(() => {
	return user.value?.email;
});

const bio = computed(() => {
	return user.value?.bio;
});

const birthday = computed(() => {
	if (user.value?.birthday) {
		return new Date(user.value.birthday);
	}
});

const birthdayDateString = computed(() => {
	if (birthday.value) {
		return moment(birthday.value).format('L');
	}
});

onUnmounted(() => {
	if (userResponse.canAbort.value) {
		userResponse.abort();
	}
});
</script>
