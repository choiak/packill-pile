<template>
	<div class='flex space-x-4'>
		<div class='flex-1 space-y-4'>
			<div class='rounded-xl border bg-white'>
				<div
					class='flex items-center justify-between border-b px-4 py-2'
				>
					<label class='text-sm font-bold uppercase text-neutral-500'>
						Password
					</label>
					<div class='flex items-center space-x-1'>
						<EyeIcon class='h-5 w-5 text-neutral-500' />
					</div>
				</div>
				<div class='space-y-8 p-8'>
					<div class='flex space-x-8'>
						<div class='flex-1 space-y-2'>
							<VenustInput
								default-type='password'
								toggled-type='text'
								autocomplete='new-password'
								input-class='w-full rounded-l-lg'
								button-class='rounded-r-lg'
								placeholder='New Password'
								@model='getNewPassword'
								has-icon
								toggleable
								:disabled='!isUnlocked'
							/>
							<div class='flex items-start space-x-1'>
								<ChevronUpIcon
									class='h-4 w-4 min-w-fit text-neutral-500'
								/>
								<p class='text-sm font-medium text-neutral-500'>
									Setting a <strong>new password</strong> can help secure your Packill account.
								</p>
							</div>
						</div>
						<div class='flex-1 space-y-2'>
							<VenustInput
								default-type='password'
								toggled-type='text'
								input-class='w-full rounded-l-lg'
								button-class='rounded-r-lg'
								placeholder='Enter your new password once more'
								@model='getConfirmationPassword'
								has-icon
								toggleable
								:disabled='!isUnlocked'
							/>
							<div class='flex items-start space-x-1'>
								<ChevronUpIcon
									class='h-4 w-4 min-w-fit text-neutral-500'
								/>
								<p class='text-sm font-medium text-neutral-500'>
									Enter your <strong>new password</strong> again to avoid typos.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { EyeIcon } from '@heroicons/vue/24/solid/index.js';
import VenustInput from '@/components/venust/input/venustInput.vue';
import { ChevronUpIcon } from '@heroicons/vue/24/outline/index.js';
import { inject, reactive, watch } from 'vue';

const emit = defineEmits(['modify']);
const isUnlocked = inject('unlockedState');

const modified = reactive({});

watch(modified, (newValue) => {
	emit('modify', newValue);
});

function getNewPassword(value) {
	if (value) {
		modified.newPassword = value
	} else {
		delete modified.newPassword
	}
}

function getConfirmationPassword(value) {
	if (value || modified.newPassword) {
		modified.confirmationPassword = value
	} else {
		delete modified.confirmationPassword
	}
}
</script>
