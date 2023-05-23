<template>
	<div class="flex h-full w-full items-center bg-stone-50 shadow">
		<div
			class="w-full space-y-10 px-6 text-center sm:w-7/12 lg:w-5/12 lg:px-12 xl:px-32"
		>
			<h6 class="font-semibold">Create an account</h6>
			<form class="mt-6 space-y-6">
				<Textbox
					default-type="text"
					input-class="w-full rounded-r-lg"
					button-class="border-r-0 rounded-l-lg"
					placeholder="Username"
					has-icon
					left-icon
					@model="getUsername"
				>
					<AtSymbolIcon class="h-6 w-6 text-neutral-500" />
				</Textbox>
				<!--        <div class="flex w-full">-->
				<!--          <div class="w-1/2">-->
				<!--            <Textbox-->
				<!--              placeholder="First name"-->
				<!--              default-type="text"-->
				<!--              input-class="mt-1 rounded-l-lg"-->
				<!--              @model="getFirstName"-->
				<!--            />-->
				<!--          </div>-->
				<!--          <div class="w-1/2">-->
				<!--            <Textbox-->
				<!--              placeholder="Last name"-->
				<!--              default-type="text"-->
				<!--              input-class="mt-1 rounded-r-lg"-->
				<!--              @model="getLastName"-->
				<!--            />-->
				<!--          </div>-->
				<!--        </div>-->
				<Textbox
					placeholder="Display Name"
					default-type="text"
					input-class="rounded-lg"
					@model="getDisplayName"
				/>
				<Textbox
					placeholder="Email"
					default-type="email"
					autocomplete="email"
					input-class="rounded-lg"
					@model="getEmail"
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
					@model="getPassword"
				/>
				<button
					type="submit"
					class="btn-accent"
					@click.prevent="registerHandler"
				>
					Create account
				</button>
			</form>
			<div class="space-y-2">
				<p class="text-sm font-medium text-neutral-700">
					Already have a Packill account?
				</p>
				<button
					type="submit"
					@click.prevent="router.push('/login')"
					class="btn-light"
				>
					Sign in
				</button>
			</div>
		</div>
		<div
			class="relative hidden overflow-hidden sm:block sm:h-full sm:flex-1"
		>
			<img
				src="@/assets/img/login.jpg"
				class="h-full w-full bg-center object-cover"
				alt="Create a new account at Packill"
			/>
			<div class="absolute bottom-8 left-8 space-y-4 text-white">
				<h1 class="font-semibold drop-shadow-xl">Packill,</h1>
				<p class="leading-5 drop-shadow-xl">
					Packed with in-depth
					<br />
					but straightforward content.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import Textbox from '@/components/venust/input/venustInput.vue';
import { AtSymbolIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { register } from '@/api/auth.js';
import router from '@/router/index.js';

const email = ref();
const password = ref();
const username = ref();
const displayName = ref();

function getEmail(value) {
	email.value = value;
}

function getPassword(value) {
	password.value = value;
}

function getUsername(value) {
	username.value = value;
}

function getDisplayName(value) {
	displayName.value = value;
}

async function registerHandler() {
	await register(username.value, displayName.value, email.value, password.value);
}
</script>
