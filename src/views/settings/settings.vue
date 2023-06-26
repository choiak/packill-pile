<template>
	<Index>
		<div class="flex h-full flex-col">
			<Dock>
				<div>
					<h5 class="font-medium">Settings</h5>
					<p class="text-sm">
						Tweak your settings to obtain an optimal learning
						experience
					</p>
				</div>
			</Dock>
			<div class="flex-1 space-y-8 overflow-auto p-8">
				<div class="flex items-center justify-between">
					<div class="flex items-baseline space-x-4">
						<router-link
							to="general"
							class="relative before:absolute before:-bottom-2 before:left-1/2 before:h-1 before:w-4 before:-translate-x-1/2 before:rounded-full before:bg-blue-600"
							:class="{
								'text-2xl font-bold':
									path === '/settings/general',
								'before:hidden': path !== '/settings/general',
							}"
						>
							General
						</router-link>
						<router-link
							to="security"
							class="relative before:absolute before:-bottom-2 before:left-1/2 before:h-1 before:w-4 before:-translate-x-1/2 before:rounded-full before:bg-blue-600"
							:class="{
								'text-2xl font-bold':
									path === '/settings/security',
								'before:hidden': path !== '/settings/security',
							}"
						>
							Security
						</router-link>
						<router-link
							to="/settings/subscription"
							class="relative before:absolute before:-bottom-2 before:left-1/2 before:h-1 before:w-4 before:-translate-x-1/2 before:rounded-full before:bg-blue-600"
							:class="{
								'text-2xl font-bold':
									path === '/settings/subscription',
								'before:hidden':
									path !== '/settings/subscription',
							}"
						>
							Subscription
						</router-link>
						<router-link to="/settings/email">
							Notifications
						</router-link>
					</div>
					<SettingsValidationPrompt
						@unlocked-state="getUnlockedState"
						:modified="modified"
					/>
				</div>
				<router-view @modify="getModified" />
			</div>
		</div>
	</Index>
</template>

<script setup>
import Index from '@/layouts/utils/index.vue';
import { computed, provide, ref, watch } from 'vue';
import SettingsValidationPrompt from '@/layouts/settings/settingsValidationPrompt.vue';
import Dock from '@/layouts/dock/dock.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const path = computed(() => {
	return route.path;
});

const isUnlocked = ref(false);
const modified = ref();

watch(path, () => {
	modified.value = null;
});

function getUnlockedState(value) {
	isUnlocked.value = value;
}

function getModified(value) {
	if (value) {
		modified.value = value;
	}
}

provide('unlockedState', isUnlocked);
</script>
