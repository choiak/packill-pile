<template>
	<div class='flex h-full w-full items-center bg-stone-50 shadow'>
		<div
			class='w-full space-y-10 px-6 text-center sm:w-7/12 lg:w-5/12 lg:px-12 xl:px-32'
		>
			<div class='space-y-4'>
				<h6 class='font-semibold'>Delete Account</h6>
				<p class='text-left text-sm text-neutral-700'>
					This process is <strong class='uppercase'>irreversible</strong>, your data will be completely wiped out from
					our database. This includes:
				</p>
				<ol class='list-disc text-sm text-neutral-700 list-inside text-justify'>
					<li>Account and profile,</li>
					<li>and, all progress in Packill.</li>
				</ol>
			</div>
			<form class='mt-6 space-y-6'>
				<Textbox
					placeholder="Password"
					default-type="password"
					toggled-type="text"
					autocomplete="current-password"
					input-class="rounded-l-lg"
					button-class="rounded-r-lg border-l-0"
					has-icon
					toggleable
					@model="getPassword"
				/>
				<button type='submit' class='btn-secondary' :disabled='password === ""' @click.prevent='deleteHandler'>
					Delete account
				</button>
			</form>
			<div class='space-y-2'>
				<p class='text-sm font-medium text-neutral-700'>
					Changed your mind?
				</p>
				<div>
					<button
						@click.prevent="router.back()"
						class='btn-light'
					>
						Go back
					</button>
				</div>
			</div>
		</div>
		<div
			class='relative hidden overflow-hidden sm:block sm:h-full sm:flex-1'
		>
			<img
				src='@/assets/img/login.jpg'
				class='h-full w-full bg-center object-cover'
				alt='Reset your Packill password'
			/>
			<div class='absolute bottom-8 left-8 space-y-4 text-white'>
				<h1 class='font-semibold drop-shadow-xl'>Oops,</h1>
				<p class='leading-5 drop-shadow-xl'>
					Seems like someone has forgotten her password,
					<br />
					no worries, we are here to help.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import Textbox from '@/components/venust/input/venustInput.vue';
import router from '@/router/index.js';
import { ref } from 'vue';
// import { deleteMe } from '@/api/me.js';

const password = ref('');

function getPassword(value) {
	password.value = value;
}

function deleteHandler() {
	// deleteMe(password.value);
}
</script>
