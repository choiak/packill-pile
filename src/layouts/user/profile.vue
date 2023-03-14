<template>
	<div class='flex flex-col w-full rounded-lg border p-4 space-y-4'>
		<div class='flex items-center space-x-2'>
			<Avatar :img-src='userAvatarUrl' />
			<div>
				<div class='flex items-center space-x-1'>
					<AtSymbolIcon class='h-5 w-5' />
					<p class='font-semibold'>
						{{ username }}
					</p>
				</div>
				<p class='text-neutral-500'>since 2023</p>
			</div>
		</div>
		<div class='flex flex-1 space-x-8'>
			<div
				class='w-1/3 flex flex-col-reverse bg-gradient-to-tr from-sky-300 to-pink-400 rounded-lg p-4 shadow-lg'>
				<h6 class='text-white font-medium'>
					{{ userBio }}
				</h6>
			</div>
			<div class='flex-1 space-y-8'>
				<div class='flex space-x-8'>
					<div>
						<h4 class='font-medium'>{{ userEmail }}</h4>
						<p class='text-sm font-medium text-neutral-500'>Email</p>
						<a :href='`mailto:${userEmail}`'
						   class='flex items-center btn-accent mt-2 text-sm px-2 py-1 space-x-1'>
							<PaperAirplaneIcon class='h-4 w-4' />
							<p>Mail</p>
						</a>
					</div>
					<div>
						<h4 class='font-medium'>anson-val</h4>
						<p class='text-sm font-medium text-neutral-500'>GitHub</p>
						<a class='flex items-center btn-accent mt-2 text-sm px-2 py-1 space-x-1'>
							<ArrowUturnRightIcon class='h-4 w-4' />
							<p>Go to profile</p>
						</a>
					</div>
				</div>
				<div class='flex space-x-8'>
					<div>
						<h3 class='font-semibold'>627</h3>
						<p class='text-sm font-medium text-neutral-500'>Topics completed</p>
					</div>
					<div>
						<h3 class='font-semibold'>300</h3>
						<p class='text-sm font-medium text-neutral-500'>Problems solved</p>
					</div>
					<div>
						<h3 class='font-semibold'>97</h3>
						<p class='text-sm font-medium text-neutral-500'>Solution provided</p>
					</div>
					<div>
						<h3 class='font-semibold'>3</h3>
						<p class='text-sm font-medium text-neutral-500'>Projects done</p>
					</div>
				</div>
				<div class='flex space-x-4'>
					<div class='flex-1 bg-slate-50 rounded-lg p-4'>
						<h6 class='font-medium'>Pinned Projects</h6>
					</div>
					<div class='flex-1 bg-slate-50 rounded-lg p-4'>
						<h6 class='font-medium'>Badges</h6>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { AtSymbolIcon, ArrowUturnRightIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline';
import Avatar from '@/components/venust/avatar/avatar.vue';

const props = defineProps({
	userObject: Object,
});

const username = props.userObject.username;
const userBio = props.userObject.bio;
const userEmail = props.userObject.email;
let userAvatarUrl;

try {
	userAvatarUrl = 'http://192.168.1.22:1337' + props.userObject.avatar.url;
} catch {
	userAvatarUrl = '@/assets/img/OIP.jpeg';
}
</script>
