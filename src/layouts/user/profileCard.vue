<template>
	<div
		class="flex w-max items-center space-x-4 rounded-lg border bg-slate-100/80 p-4 shadow-lg backdrop-blur"
	>
		<div class="space-y-2">
			<img :src="userAvatarUrl" class="h-12 w-12 rounded-full" />
			<div>
				<div class="flex items-center space-x-1">
					<AtSymbolIcon class="h-4 w-4" />
					<p class="text-sm font-medium">
						{{ userObject.username }}
					</p>
				</div>
				<h6 class="font-semibold">{{ userObject.displayName }}</h6>
			</div>
			<button
				class="btn-accent mt-2 flex items-center space-x-1 px-2 py-1 text-xs"
				@click.prevent="router.push(`/users/${props.userId}`)"
			>
				<ArrowUturnRightIcon class="h-4 w-4" />
				<label>Profile</label>
			</button>
		</div>
		<div>
			<label class="text-xs font-medium text-neutral-700">
				Biography
			</label>
			<p class="max-w-[250px] text-sm">
				{{ userObject.bio }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { AtSymbolIcon, ArrowUturnRightIcon } from '@heroicons/vue/24/outline';
import { getUser } from '@/api/user.js';
import router from '@/router/index.js';

const props = defineProps({
	userId: String,
});

const userObject = getUser(props.userId);

let userAvatarUrl;

try {
	userAvatarUrl = 'http://localhost:1337' + userObject.avatar.url;
} catch {
	userAvatarUrl = '@/assets/img/OIP.jpeg';
}
</script>
