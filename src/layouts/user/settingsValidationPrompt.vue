<template>
	<button
		class="btn-accent group flex items-center space-x-1"
		@click.prevent="unlock"
		v-if="!isUnlocked"
	>
		<LockOpenIcon class="h-4 w-4 antialiased" />
		<label>Unlock to modify settings</label>
	</button>
	<div class="flex items-center space-x-2" v-if="isUnlocked">
		<button
			class="btn-secondary group flex items-center space-x-1"
			@click.prevent="toggle"
		>
			<LockClosedIcon class="h-4 w-4 antialiased" />
			<label>Lock to confirm changes</label>
		</button>
		<button
			class="btn-light group flex items-center space-x-1"
			@click.prevent="reload"
		>
			<XMarkIcon class="h-4 w-4 antialiased" />
			<label>Abort</label>
		</button>
	</div>
	<Transition name="fade">
		<div
			class="absolute left-0 top-0 z-50 h-screen w-screen backdrop-blur"
			v-if="isActive && isUnlocked"
		>
			<div
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-8 rounded-lg bg-white p-8 shadow-xl backdrop-blur"
				v-click-away="close"
			>
				<div class="space-y-1">
					<h4 class="font-semibold">Lock</h4>
					<h6 class="text-sm font-medium text-neutral-500">
						Enter your password to confirm changes to settings
					</h6>
				</div>
				<form
					class="space-y-8"
					@keydown.enter.prevent="validateHandler"
				>
					<VenustInput
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
					<div class="flex items-center justify-between">
						<button
							class="btn-light group flex items-center space-x-1"
							type="button"
							@click.prevent="reload"
						>
							<XMarkIcon class="h-4 w-4 antialiased" />
							<label>Abort</label>
						</button>
						<button
							class="btn-accent group flex items-center space-x-1"
							type="button"
							@click.prevent="validateHandler"
						>
							<LockClosedIcon class="h-4 w-4 antialiased" />
							<label>Lock & Update</label>
						</button>
					</div>
				</form>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import VenustInput from '@/components/venust/input/venustInput.vue';
import {
	LockOpenIcon,
	LockClosedIcon,
	XMarkIcon,
} from '@heroicons/vue/24/outline/index.js';
import { ref } from 'vue';
import { doubleValidate } from '@/api/auth.js';

const isUnlocked = ref(false);
const isActive = ref(false);

function unlock() {
	isUnlocked.value = true;
}

function lock() {
	isUnlocked.value = false;
}

function toggle() {
	isActive.value = !isActive.value;
}

function close() {
	isActive.value = false;
}

function reload() {
	window.location.reload();
}

const password = ref();

function getPassword(value) {
	password.value = value;
}

const emit = defineEmits(['validationState']);

async function validateHandler() {
	const isValid = await doubleValidate(password.value);

	if (isValid) {
		emit('validationState', isValid);
		lock();
	}
}
</script>
