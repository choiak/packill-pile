<template>
	<div class='flex space-x-4'>
		<div class='flex-1 space-y-4'>
			<div class='rounded-xl border bg-white'>
				<div
					class='flex items-center justify-between border-b px-4 py-2'
				>
					<label class='text-sm font-bold uppercase text-neutral-500'>
						Account
					</label>
					<div class='flex items-center space-x-1'>
						<IdentificationIcon class='h-5 w-5 text-neutral-500' />
					</div>
				</div>
				<div class='space-y-8 p-8'>
					<div class='flex space-x-8'>
						<div class='flex-1 space-y-2'>
							<VenustInput
								default-type='text'
								input-class='w-full rounded-r-lg'
								button-class='border-r-0 rounded-l-lg'
								placeholder='Username'
								has-icon
								left-icon
								:default-value='user?.username'
								@model='getUsername'
								:disabled='!isUnlocked'
							>
								<AtSymbolIcon
									class='h-6 w-6 text-neutral-500'
								/>
							</VenustInput>
							<div class='flex items-start space-x-1'>
								<ChevronUpIcon
									class='h-4 w-4 min-w-fit text-neutral-500'
								/>
								<p class='text-sm font-medium text-neutral-500'>
									<strong>Username</strong>
									is a unique identifier that other Packill
									users can use it to find you.
								</p>
							</div>
						</div>
						<div class='flex-1 space-y-2'>
							<VenustInput
								default-type='text'
								input-class='w-full rounded-lg'
								placeholder='Legal Name'
								:default-value='user?.legalName'
								@model='getLegalName'
								:disabled='!isUnlocked'
							/>
							<div class='flex items-start space-x-1'>
								<ChevronUpIcon
									class='h-4 w-4 min-w-fit text-neutral-500'
								/>
								<p class='text-sm font-medium text-neutral-500'>
									<strong>Legal name</strong>
									is the name that is officially recognized by
									the government. This will be used only for
									generating certificates and charging
									subscription fees. This will
									<strong>NOT</strong>
									be shown publicly.
								</p>
							</div>
						</div>
					</div>
					<div class='space-y-2'>
						<VenustInput
							default-type='text'
							input-class='w-full rounded-lg'
							placeholder='Email'
							:default-value='user?.email'
							@model='getEmail'
							:disabled='!isUnlocked'
						/>
						<div class='flex items-start space-x-1'>
							<ChevronUpIcon
								class='h-4 w-4 min-w-fit text-neutral-500'
							/>
							<p class='text-sm font-medium text-neutral-500'>
								This
								<strong>email address</strong>
								will be used for you to sign in and for us to
								contact you.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class='rounded-xl border bg-white'>
				<div
					class='flex items-center justify-between border-b px-4 py-2'
				>
					<label class='text-sm font-bold uppercase text-neutral-500'>
						Profile
					</label>
					<div class='flex items-center space-x-1'>
						<FaceSmileIcon class='h-5 w-5 text-neutral-500' />
					</div>
				</div>
				<div class='space-y-8 p-8'>
					<div class='flex space-x-8'>
						<div class='flex-1 space-y-2'>
							<VenustInput
								default-type='text'
								input-class='w-full rounded-lg'
								placeholder='Display Name'
								:default-value='user?.displayName'
								@model='getDisplayName'
								:disabled='!isUnlocked'
							/>
							<div class='flex items-start space-x-1'>
								<ChevronUpIcon
									class='h-4 w-4 min-w-fit text-neutral-500'
								/>
								<p class='text-sm font-medium text-neutral-500'>
									<strong>Display name</strong>
									is the preferred name of how you want others
									to call you.
								</p>
							</div>
						</div>
						<div class='flex-1 space-y-2'>
							<VenustInput
								default-type='text'
								input-class='w-full rounded-lg'
								placeholder='GitHub Username'
								:default-value='user?.githubUsername'
								@model='getGithubUsername'
								:disabled='!isUnlocked'
							/>
							<div class='flex items-start space-x-1'>
								<ChevronUpIcon
									class='h-4 w-4 min-w-fit text-neutral-500'
								/>
								<p class='text-sm font-medium text-neutral-500'>
									You can attach your
									<strong>GitHub username</strong>
									so that other Packill users can appreciate
									your amazing projects.
								</p>
							</div>
						</div>
					</div>
					<div class='space-y-2'>
						<VenustTextarea
							input-class='w-full rounded-lg'
							placeholder='Biography'
							:default-value='user?.bio'
							@model='getBio'
							:disabled='!isUnlocked'
						/>
						<div class='flex items-start space-x-1'>
							<ChevronUpIcon
								class='h-4 w-4 min-w-fit text-neutral-500'
							/>
							<p class='text-sm font-medium text-neutral-500'>
								<strong>Biography</strong>
								is a short paragraph about yourself.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class='flex w-[300px] flex-col space-y-4'>
			<div class='rounded-xl border bg-white'>
				<div
					class='flex items-center justify-between border-b px-4 py-2'
				>
					<label class='text-sm font-bold uppercase text-neutral-500'>
						Avatar
					</label>
					<div class='flex items-center space-x-1'>
						<PhotoIcon class='h-5 w-5 text-neutral-500' />
					</div>
				</div>
				<div class='p-4'>
					<div class='space-y-2'>
						<div class='flex items-center space-x-4'>
							<VenustAvatar :user-id='user?.id' />
							<form class='space-y-2'>
								<VenustFileInput class='w-full' name='avatar' />
								<button class='btn-accent'>
									Delete avatar
								</button>
							</form>
						</div>
						<div class='flex items-start space-x-1'>
							<ChevronUpIcon
								class='h-4 w-4 min-w-fit text-neutral-500'
							/>
							<p class='text-sm font-medium text-neutral-500'>
								<strong>Avatar</strong>
								is a picture that reflects your personality or
								interests.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class='rounded-xl border bg-orange-50'>
				<div
					class='flex items-center justify-between border-b px-4 py-2 bg-stripes bg-stripes-orange-100 rounded-t-xl text-orange-600'
				>
					<label class='text-sm font-bold uppercase'>
						Danger Zone
					</label>
					<div class='flex items-center space-x-1'>
						<ExclamationTriangleIcon
							class='h-5 w-5'
						/>
					</div>
				</div>
				<div class='p-4'>
					<router-link class='space-y-2' to='/delete-account'>
						<p class='text-xs font-medium text-neutral-500'>Once you delete your account, there is <strong class='uppercase'>no going back</strong>. Please be <strong class='uppercase'>certain</strong>.</p>
						<button class='btn-secondary'>Delete account</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { getMe } from '@/api/me.js';
import { computed, inject, onUnmounted, reactive, watch } from 'vue';
import VenustInput from '@/components/venust/input/venustInput.vue';
import { AtSymbolIcon, ChevronUpIcon } from '@heroicons/vue/24/outline';
import {
	IdentificationIcon,
	FaceSmileIcon,
	PhotoIcon,
	ExclamationTriangleIcon,
} from '@heroicons/vue/24/solid';
import VenustTextarea from '@/components/venust/textarea/venustTextarea.vue';
import VenustFileInput from '@/components/venust/fileInput/venustFileInput.vue';
import VenustAvatar from '@/components/venust/avatar/venustAvatar.vue';
import SettingsValidationPrompt from '@/layouts/settings/settingsValidationPrompt.vue';

const emit = defineEmits(['modify'])
const isUnlocked = inject('unlockedState');

const userResponse = getMe({
	populate: {
		avatar: true,
	},
});

const user = computed(() => {
	return userResponse.data.value;
});

watch(isUnlocked, (newState) => {
	if (!newState) {
		userResponse.execute();
	}
});

const modified = reactive({});

watch(modified, (newValue) => {
	emit('modify', newValue);
});

function getUsername(value) {
	if (value !== user.value.username) {
		modified.username = value;
	} else {
		delete modified.username;
	}
}

function getLegalName(value) {
	if (value !== user.value.legalName) {
		modified.legalName = value;
	} else {
		delete modified.legalName;
	}
}

function getEmail(value) {
	if (value !== user.value.email) {
		modified.email = value;
	} else {
		delete modified.email;
	}
}

function getDisplayName(value) {
	if (value !== user.value.displayName) {
		modified.displayName = value;
	} else {
		delete modified.displayName;
	}
}

function getGithubUsername(value) {
	if (value !== user.value.githubUsername) {
		modified.githubUsername = value;
	} else {
		delete modified.githubUsername;
	}
}

function getBio(value) {
	if (value !== user.value.bio) {
		modified.bio = value;
	} else {
		delete modified.bio;
	}
}

onUnmounted(() => {
	if (userResponse.canAbort.value) {
		userResponse.abort()
	}
});
</script>
