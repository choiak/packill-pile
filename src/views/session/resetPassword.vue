<template>
	<div class="flex h-full w-full items-center bg-stone-50 shadow">
		<div
			class="w-full space-y-10 px-6 text-center sm:w-7/12 lg:w-5/12 lg:px-12 xl:px-32"
		>
			<h6 class="font-semibold">Enter your new password</h6>
			<form class="mt-6 space-y-6">
				<Textbox
					placeholder="New Password"
					default-type="password"
					toggled-type="text"
					autocomplete="new-password"
					input-class="rounded-l-lg"
					button-class="rounded-r-lg border-l-0"
					has-icon
					toggleable
					@model="getPassword"
				/>
				<Textbox
					placeholder="Password"
					default-type="password"
					toggled-type="text"
					autocomplete="new-password"
					input-class="rounded-l-lg"
					button-class="rounded-r-lg border-l-0"
					has-icon
					toggleable
					@model="getPasswordConfirmed"
				/>
				<button type="submit" class="btn-accent" @click.prevent="">
					Confirm new password
				</button>
			</form>
		</div>
		<div
			class="relative hidden overflow-hidden sm:block sm:h-full sm:flex-1"
		>
			<img
				src="@/assets/img/login.jpg"
				class="h-full w-full bg-center object-cover"
				alt="Sign in to Packill"
			/>
			<div class="absolute bottom-8 left-8 space-y-4 text-white">
				<h1 class="font-semibold drop-shadow-xl">Welcome back,</h1>
				<p class="leading-5 drop-shadow-xl">
					Continue your journey at Packill.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import Textbox from '@/components/venust/input/venustInput.vue';
import { ref } from 'vue';

const password = ref();
const passwordConfirmed = ref();

function getPassword(value) {
	password.value = value;
}

function getPasswordConfirmed(value) {
	passwordConfirmed.value = value;
}
</script>
